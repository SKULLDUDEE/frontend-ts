import React, { useEffect, useState, useContext } from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar
} from 'recharts';
import {
  CircularProgressbar, buildStyles
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { UserContext } from '../UserContext';
import './Analytics.css';

export default function Analytics() {
  const { userId } = useContext(UserContext);
  const [tickets, setTickets] = useState([]);
  const [missedData, setMissedData] = useState([]);
  const [avgReplySec, setAvgReplySec] = useState(0);
  const [resolvedPct, setResolvedPct] = useState(0);
  const [missedThreshold, setMissedThreshold] = useState(3600); // default 1h

  // Load threshold once
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/chatbot/design`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => res.json())
      .then(data => {
        // parse "HH:MM:SS" into seconds
        const [h, m, s] = data.missedChatTimer.split(':').map(Number);
        setMissedThreshold(h * 3600 + m * 60 + s);
      })
      .catch(console.error);
  }, []);

  // Add a refresh interval to periodically update the analytics
  useEffect(() => {
    // Function to fetch tickets
    const fetchTicketsData = () => {
      console.log('Fetching tickets for analytics...');
      fetch(`${import.meta.env.VITE_API_URL}/tickets/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        // Add cache busting to ensure we get fresh data
        cache: 'no-store'
      })
        .then(res => res.json())
        .then(data => {
          console.log('Tickets data received:', data);
          setTickets(data);
          calculateMetrics(data);
        })
        .catch(error => {
          console.error('Error fetching tickets for analytics:', error);
        });
    };

    // Fetch immediately on component mount
    fetchTicketsData();

    // Set up an interval to refresh data every 10 seconds
    const intervalId = setInterval(fetchTicketsData, 10000);

    // Clean up the interval when component unmounts
    return () => clearInterval(intervalId);
  }, [userId, missedThreshold]);

  function calculateMetrics(data) {
    console.log('Calculating metrics from data:', data);
    const weeks = Array(10).fill(0);
    let totalReplies = 0, totalDiff = 0;
    let resolvedCount = 0, totalChats = data.length;

    // Log all ticket statuses to debug
    console.log('All ticket statuses:', data.map(t => ({ id: t._id, status: t.status })));

    data.forEach(ticket => {
      const msgs = ticket.messages;
      console.log(`Processing ticket ${ticket._id} with ${msgs.length} messages, status: ${ticket.status}`);
      
      for (let i = 0; i < msgs.length - 1; i++) {
        if (msgs[i].sender === 'user' && msgs[i + 1].sender === 'bot') {
          const diffSec =
            (new Date(msgs[i + 1].timestamp) - new Date(msgs[i].timestamp)) / 1000;
          totalReplies++;
          totalDiff += diffSec;
          if (diffSec > missedThreshold) {
            const ageWeeks = Math.min(
              9,
              Math.floor(
                (Date.now() - new Date(ticket.createdAt)) / (1000 * 60 * 60 * 24 * 7)
              )
            );
            weeks[ageWeeks]++;
          }
        }
      }
      
      // Count resolved tickets
      if (ticket.status === 'resolved') {
        resolvedCount++;
        console.log(`Found resolved ticket: ${ticket._id}`);
      }
    });

    const chartData = weeks.map((count, i) => ({ week: `Week ${i + 1}`, chats: count }));
    console.log('Generated chart data:', chartData);
    
    // Calculate metrics
    const avgReplySeconds = totalReplies ? Math.round(totalDiff / totalReplies) : 0;
    const resolvedPercentage = totalChats ? Math.round((resolvedCount / totalChats) * 100) : 0;
    
    console.log('Metrics calculated:', {
      resolvedCount,
      totalChats,
      resolvedPercentage,
      avgReplySeconds
    });
    
    // Update state with calculated metrics
    setMissedData(chartData);
    setAvgReplySec(avgReplySeconds);
    setResolvedPct(resolvedPercentage);
  }

  // Sample data for testing the chart
  const sampleData = [
    { week: 'Week 1', chats: 5 },
    { week: 'Week 2', chats: 3 },
    { week: 'Week 3', chats: 7 },
    { week: 'Week 4', chats: 2 },
    { week: 'Week 5', chats: 6 },
    { week: 'Week 6', chats: 4 },
    { week: 'Week 7', chats: 8 },
    { week: 'Week 8', chats: 3 },
    { week: 'Week 9', chats: 5 },
    { week: 'Week 10', chats: 9 }
  ];

  return (
    <div className="analytics-container">
      <h1>Analytics</h1>
      <section className="metric-section">
        <h2>Missed Chats</h2>
        <div className="chart-wrap">
          {missedData.length > 0 ? (
            <>
              <p>Chart data available: {missedData.length} data points</p>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={missedData}>
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="chats" stroke="#00b300" dot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </>
          ) : (
            <>
              <p>No actual data available. Showing sample charts:</p>
              <div style={{ marginBottom: '20px' }}>
                <ResponsiveContainer width="100%" height={150}>
                  <LineChart data={sampleData}>
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="chats" stroke="#00b300" dot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div>
                <ResponsiveContainer width="100%" height={150}>
                  <BarChart data={sampleData}>
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="chats" fill="#00b300" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </>
          )}
        </div>
      </section>

      <section className="metric-section flex-section">
          <div className="metric-desc">
          <h2>Average Reply time</h2>
          <p>For highest customer satisfaction rates you should aim to reply to an incoming customer's message in 15 seconds or less. Quick responses will get you more conversations, help you earn customers trust and make more sales. </p>
          </div>
          <div className="metric-value">
          <div className="large-num">{avgReplySec} secs</div>
          </div>
      </section>

        <section className="metric-section flex-section">
          <div className="metric-desc">
          <h2>Resolved Tickets</h2>
          <p> A callback system on a website, as well as proactive invitations, help to attract even more customers. A separate round button for ordering a call with a small animation helps to motivate more customers to make calls. </p>
          <div className="ticket-stats">
            <p><strong>Total tickets:</strong> {tickets.length}</p>
            <p><strong>Resolved tickets:</strong> {tickets.filter(t => t.status === 'resolved').length}</p>
          </div>
          </div>
          <div className="metric-value circular-chart">
            <CircularProgressbar
              value={resolvedPct}
              text={`${resolvedPct}%`}
              styles={buildStyles({ pathColor: '#00b300', textColor: '#00b300' })}
            />
          </div>
      </section>

      <section className="metric-section flex-section">
        <div className="metric-desc">
        <h2>Total Chats</h2>
        <p> This metric Shows the total number of chats for all Channels for the selected the selected period </p>
        </div>
        <div className="metric-value">
        <div className="large-num">{tickets.length} Chats</div>
        </div>
      </section>
    </div>
  );
}