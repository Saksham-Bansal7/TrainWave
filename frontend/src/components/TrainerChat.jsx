import React, { useState, useEffect, useRef } from 'react'
import axiosInstance from '../utils/axiosInstance'
import { API_PATHS } from '../utils/apiPaths'

const TrainerChat = () => {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [user, setUser] = useState(null)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  // Check user login status
  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      try {
        setUser(JSON.parse(userData))
      } catch (error) {
        console.error('Error parsing user data:', error)
      }
    }
  }, [])

  // Load chat messages on component mount
  useEffect(() => {
    if (user) {
      loadMessages()
    }
  }, [user])

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const loadMessages = async () => {
    setIsLoading(true)
    try {
      const response = await axiosInstance.get(API_PATHS.CHAT.GET_MESSAGE)
      setMessages(response.data.messages || [])
    } catch (error) {
      console.error('Failed to load messages:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const sendMessage = async (e) => {
    e.preventDefault()
    if (!newMessage.trim() || isSending) return

    setIsSending(true)
    const messageToSend = newMessage.trim()
    setNewMessage('') // Clear input immediately

    try {
      const response = await axiosInstance.post(API_PATHS.CHAT.SEND_MESSAGE, {
        newMessage: messageToSend
      })
      setMessages(response.data.messages || [])
    } catch (error) {
      console.error('Failed to send message:', error)
      setNewMessage(messageToSend) // Restore message on error
    } finally {
      setIsSending(false)
      inputRef.current?.focus()
    }
  }

  const startNewChat = async () => {
    if (window.confirm('Are you sure you want to start a new chat? This will delete all previous messages.')) {
      try {
        await axiosInstance.post(API_PATHS.CHAT.NEW_CHAT)
        setMessages([])
      } catch (error) {
        console.error('Failed to start new chat:', error)
      }
    }
  }

  const deleteMessage = async (messageId) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await axiosInstance.delete(API_PATHS.CHAT.DELETE_MESSAGE(messageId))
        await loadMessages() // Reload messages after deletion
      } catch (error) {
        console.error('Failed to delete message:', error)
      }
    }
  }

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 pt-24 pb-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-4">Access Denied</h2>
            <p className="text-white/80">Please log in to chat with your AI trainer.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 pt-24 pb-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            AI Fitness <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Trainer</span>
          </h1>
          <p className="text-white/80 text-lg">Get personalized workout advice and motivation 💪</p>
        </div>

        {/* Chat Container */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
          {/* Chat Header */}
          <div className="bg-white/5 border-b border-white/10 p-4 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">🏋️</span>
              </div>
              <div>
                <h3 className="text-white font-semibold">FitBot Trainer</h3>
                <p className="text-white/60 text-sm">Online • Ready to help</p>
              </div>
            </div>
            <button
              onClick={startNewChat}
              className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg hover:from-red-600 hover:to-pink-700 transition-all duration-300 text-sm font-medium shadow-lg"
            >
              New Chat
            </button>
          </div>

          {/* Messages Container */}
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {isLoading ? (
              <div className="flex justify-center items-center h-full">
                <div className="text-white/60">Loading chat history...</div>
              </div>
            ) : messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="text-6xl mb-4">🏋️‍♂️</div>
                <h3 className="text-white text-xl font-semibold mb-2">Welcome to AI Trainer!</h3>
                <p className="text-white/60 max-w-md">
                  I'm here to help you with workout plans, exercise form, nutrition tips, and motivation. 
                  Ask me anything about fitness!
                </p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message._id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl relative group ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                        : 'bg-white/10 backdrop-blur-md border border-white/20 text-white'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs opacity-60">
                        {formatTime(message.timestamp)}
                      </span>
                      <button
                        onClick={() => deleteMessage(message._id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs hover:text-red-300"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
            
            {isSending && (
              <div className="flex justify-start">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white max-w-xs lg:max-w-md px-4 py-2 rounded-2xl">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-sm text-white/60">FitBot is typing...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <form onSubmit={sendMessage} className="border-t border-white/10 p-4">
            <div className="flex space-x-3">
              <input
                ref={inputRef}
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Ask about workouts, nutrition, form tips..."
                className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
                disabled={isSending}
              />
              <button
                type="submit"
                disabled={!newMessage.trim() || isSending}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-xl hover:from-cyan-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg font-medium"
              >
                {isSending ? '...' : 'Send'}
              </button>
            </div>
          </form>
        </div>

        {/* Quick Tips */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { emoji: '💪', title: 'Workout Plans', desc: 'Get personalized routines' },
            { emoji: '✅', title: 'Form Check', desc: 'Improve your technique' },
            { emoji: '🥗', title: 'Nutrition', desc: 'Healthy eating tips' }
          ].map((tip, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 transition-all duration-300 cursor-pointer"
              onClick={() => setNewMessage(`Tell me about ${tip.title.toLowerCase()}`)}
            >
              <div className="text-2xl mb-2">{tip.emoji}</div>
              <h4 className="text-white font-semibold text-sm">{tip.title}</h4>
              <p className="text-white/60 text-xs mt-1">{tip.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TrainerChat