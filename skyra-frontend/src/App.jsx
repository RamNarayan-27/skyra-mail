import { useState } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import './App.css'
import AnalysisResults from './components/AnalysisResults'
import ComposeEmail from './components/ComposeEmail'

function Home() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleAnalyze = async () => {
    setLoading(true)
    try {
      // Replace with your actual API endpoint
      const response = await fetch('https://api.example.com/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      })
      
      const data = await response.json()
      // Store the results in localStorage to persist across navigation
      localStorage.setItem('analysisResults', JSON.stringify(data))
      navigate('/results')
    } catch (error) {
      console.error('Error analyzing URL:', error)
      // For demo purposes, using mock data
      const mockData = {
        'feature-1': true,
        'feature-2': false,
        'feature-3': true,
        'feature-4': false,
        'feature-5': true,
        'feature-6': false,
        'feature-7': true,
        'feature-8': false,
        'category': 'churn-risk'
      }
      localStorage.setItem('analysisResults', JSON.stringify(mockData))
      navigate('/results')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <div className="logo-container">
        <div className="logo-circle">
          <div className="logo-inner"></div>
        </div>
      </div>
      <h1 className="title">Skyra Mail</h1>
      <p className="subtitle">Automate your email outreach with AI</p>
      <input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter URL"
        className="url-input"
      />
      <button 
        onClick={handleAnalyze} 
        className="analyze-button"
        disabled={loading}
      >
        {loading ? 'Analyzing...' : 'Analyze'}
      </button>
    </div>
  )
}

function Results() {
  const results = JSON.parse(localStorage.getItem('analysisResults'))
  return <AnalysisResults results={results} />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<Results />} />
        <Route path="/compose-email" element={<ComposeEmail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
