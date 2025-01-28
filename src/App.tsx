import React, { useState } from 'react';
import { Brain, Github, Mail, Sparkles } from 'lucide-react';
import { generateQuestion } from './lib/gemini';

function App() {
  const [topic, setTopic] = useState('');
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const generatedQuestion = await generateQuestion(topic);
      setQuestion(generatedQuestion);
    } catch (err) {
      setError('Failed to generate question. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-pink-900 to-gray-900 relative">
      {/* Overlay pattern */}
      <div className="absolute inset-0 opacity-5" 
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
           }}
      ></div>

      <nav className="bg-gray-900 bg-opacity-90 shadow-lg relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Brain className="h-8 w-8 text-pink-500" />
              <span className="ml-2 text-xl font-bold text-white">SOFTWARE ENGINEERING</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-12 relative z-10">
        <div className="bg-gray-800 bg-opacity-90 rounded-2xl shadow-2xl p-8 mb-8 border border-pink-500/20">
          <h1 className="text-3xl font-bold text-white mb-2">
            Software Refactoring and Code Smells
          </h1>
          <p className="text-gray-300 mb-8">
            Generate quiz questions about Refactoring and Code Smells using AI
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="topic" className="block text-sm font-medium text-gray-300">
                Enter a Topic
              </label>
              <div className="mt-1 relative">
                <input
                  type="text"
                  id="topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., Refactoring, Code Clones"
                  className="block w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:ring-pink-500 focus:border-pink-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50"
            >
              {loading ? (
                'Generating...'
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generate Question
                </>
              )}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-900/50 border border-red-500/50 rounded-lg text-red-200">
              {error}
            </div>
          )}

          {question && (
            <div className="mt-8 p-6 bg-gray-700/50 border border-pink-500/20 rounded-lg">
              <h2 className="text-lg font-semibold text-white mb-2">Generated Question:</h2>
              <p className="text-gray-300">{question}</p>
            </div>
          )}
        </div>

        <div className="bg-gray-800 bg-opacity-90 rounded-2xl shadow-2xl p-8 border border-pink-500/20">
          <h2 className="text-2xl font-bold text-white mb-4">About</h2>
          <div className="prose">
            <p className="text-gray-300">
              AI assist helps to answer questions about Software Engineering concepts like Refactoring and Code Smells.
            </p>
            
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-white">Contact</h3>
              <div className="mt-2 space-y-2">
                <p className="text-gray-300 font-medium">Zhala Sarkawt Othman</p>
                <div className="flex items-center space-x-4">
                  <a href="mailto:Zhala.sarkawt@gmail.com" className="flex items-center text-pink-400 hover:text-pink-300">
                    <Mail className="w-5 h-5 mr-2" />
                    Zhala.sarkawt@gmail.com
                  </a>
                  <a href="https://github.com" className="flex items-center text-pink-400 hover:text-pink-300">
                    <Github className="w-5 h-5 mr-2" />
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;