import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AnalysisResults.css';

const categoryMap = {
  'churn-risk': 'Churn Risk',
  'feature-adoption': 'Feature Adoption'
};

const mockEmailData = {
  subject: "Customer Analysis Report",
  template: {
    greeting: "Hello Team,",
    summary: "Based on our recent analysis, we've identified several key insights:",
    recommendations: [
      "User engagement has decreased by 20%",
      "Feature adoption rate is below target",
      "Consider implementing targeted onboarding"
    ],
    closing: "Please review these findings and let's discuss next steps.",
  },
  metadata: {
    priority: "High",
    category: "Customer Success"
  }
};

const AnalysisResults = ({ results }) => {
  const navigate = useNavigate();
  console.log(results);

  const handleSendEmail = async () => {
    try {
      // Make API call to compose-email endpoint
      // const response = await fetch('/api/compose-email', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     analysisResults: results
      //   })
      // });

      // if (!response.ok) {
      //   throw new Error('Failed to fetch email data');
      // }

      // const emailData = await response.json();
      
      // Navigate to compose email page with the API response data
      navigate('/compose-email', {
        state: { emailData: mockEmailData }
      });
    } catch (error) {
      console.error('Error fetching email data:', error);
      // You might want to show an error message to the user here
    }
  };

  return (
    <div className="analysis-results">
      <h1 className='analysis-results-title'>Analysis Results</h1>
      <h2 className='analysis-results-subtitle'>{categoryMap[results.category]}</h2>
      <div className="results-container">
        <div className="left-column">
          {Object.entries(results)
            .filter(([key]) => key !== 'category')
            .slice(0, 4)
            .map(([feature, value]) => (
              <div key={feature} className="feature-card">
                <div className="feature-icon">
                  {value ? (
                    <span className="checkmark">✓</span>
                  ) : (
                    <span className="cross">✕</span>
                  )}
                </div>
                <div className="feature-name">
                  {feature.split('-').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' ')}
                </div>
              </div>
            ))}
        </div>
        <div className="right-column">
          {Object.entries(results)
            .filter(([key]) => key !== 'category')
            .slice(4)
            .map(([feature, value]) => (
              <div key={feature} className="feature-card">
                <div className="feature-icon">
                  {value ? (
                    <span className="checkmark">✓</span>
                  ) : (
                    <span className="cross">✕</span>
                  )}
                </div>
                <div className="feature-name">
                  {feature.split('-').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' ')}
                </div>
              </div>
            ))}
        </div>
      </div>
      <button className='send-email-button' onClick={handleSendEmail}>
        Send Email
      </button>
    </div>
  );
};

export default AnalysisResults; 
