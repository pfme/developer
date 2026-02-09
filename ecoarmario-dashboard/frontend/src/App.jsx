import ClientForm from './pages/ClientForm';
import Roulette from './pages/Roulette';
```javascript
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WebSocketProvider } from './context/WebSocketContext';
import LiveDashboard from './pages/LiveDashboard';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/AdminDashboard';
import CRM from './pages/CRM';

function App() {
  return (
    <Router>
      <WebSocketProvider>
        <Routes>
          <Route path="/" element={<LiveDashboard />} />
          <Route path="/live" element={<LiveDashboard />} />
          
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            {/* Note: In Layout I linked to /crm, but here I should probably nest it under /admin or make /crm root-level. 
                If I want visual consistency, put /crm under /admin route but path can be relative or absolute. 
                Let's use absolute path /crm but use AdminLayout? No, nested routes usually are relative.
                But if I want /crm URL, I can map it outside or use /admin/crm.
                Layout has links to '/crm'. Let's support that.
            */}
          </Route>
          
          <Route path="/crm" element={<AdminLayout />}>
             <Route index element={<CRM />} />
          </Route>
          
          <Route path="/form" element={<ClientForm />} />
          <Route path="/live/ruleta" element={<Roulette />} />
        </Routes>
      </WebSocketProvider>
    </Router>
  );
}

export default App;
```
