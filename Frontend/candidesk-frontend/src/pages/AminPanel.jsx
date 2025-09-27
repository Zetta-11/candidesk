import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminPanel = () => {
  const cards = [
    { title: 'Users', description: 'Users control', path: '/admin/users' },
    { title: 'Tasks', description: 'Tasks control', path: '/admin/tasks' },
    { title: 'Settings', description: 'Settings manipulating', path: '/admin/settings' },
    { title: 'Stats', description: 'Stats view', path: '/admin/stats' },
    { title: 'Candidates', description: 'Candidates view', path: '/admin/candidates' },
  ];

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Admin Panel</h2>
      <div className="row">
        {cards.map((card, idx) => (
          <div key={idx} className="col-md-3 mb-4">
            <NavLink to={card.path} className="text-decoration-none">
              <div className="card h-100 shadow-sm hover-shadow">
                <div className="card-body d-flex flex-column justify-content-center align-items-center text-center">
                  <h5 className="card-title">{card.title}</h5>
                  <p className="card-text">{card.description}</p>
                  <button className="btn btn-primary mt-auto">View</button>
                </div>
              </div>
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
