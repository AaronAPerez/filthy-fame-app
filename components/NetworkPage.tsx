import React from "react";
import Button from "./ui/Button";
import { Card } from "./ui";


// Networking Page
const NetworkingPage = () => {
  return (
    <div className="p-8 bg-gradient-to-b from-gray-950/50 to-black/50">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-black text-transparent bg-gradient-to-r from-emerald-500 via-blue-500 to-indigo-500 bg-clip-text mb-4">
            Network & Connect
          </h1>
          <p className="text-gray-400 text-lg">Build your network in the culture</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Suggested Connections</h2>
            <div className="space-y-6">
              {[
                { user: 'UrbanInfluencer', gradient: 'from-indigo-500 to-blue-500' },
                { user: 'CultureCritic', gradient: 'from-blue-500 to-cyan-500' },
                { user: 'StreetReporter', gradient: 'from-emerald-500 to-green-500' }
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              ].map(({ user, gradient }, idx) => (
                <div key={user} className="flex items-center justify-between group">
                  <div className="flex items-center space-x-4">
                    <div className={`w-14 h-14 bg-gradient-to-r ${gradient} rounded-full flex items-center justify-center text-lg font-bold shadow-lg`}>
                      {user[0]}
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-lg">{user}</h3>
                      <p className="text-gray-400">Content Creator • 45K followers</p>
                    </div>
                  </div>
                  <Button variant="primary" size="md">
                    Connect
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-8">
          {/* <Card variant="elevated" className="p-8"> */}
            <h2 className="text-2xl font-bold text-white mb-6">Industry Events</h2>
            <div className="space-y-6">
              {[
                { name: 'Hip-Hop Summit 2025', date: 'March 15', variant: 'warning' },
                { name: 'Creator Conference', date: 'April 2', variant: 'primary' },
                { name: 'Industry Mixer', date: 'April 20', variant: 'success' }
              ].map((event) => (
                <Card key={event.name} className="p-6 border-gray-600/50 hover:border-gray-500 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-white text-lg mb-1">{event.name}</h3>
                      <p className="text-gray-400">{event.date} • Networking opportunity</p>
                    </div>
                    <button>
                      Join
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};


export default NetworkingPage;