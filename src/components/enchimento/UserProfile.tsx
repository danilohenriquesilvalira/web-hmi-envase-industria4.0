import React, { useState } from 'react';

interface UserProfileProps {
  name: string;
  role: string;
  avatarUrl?: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ 
  name, 
  role, 
  avatarUrl 
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Generate initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const initials = getInitials(name);
  
  // Random color based on name
  const getAvatarColor = (name: string) => {
    const colors = [
      '#2563eb', '#16a34a', '#ea580c', '#9333ea', 
      '#0891b2', '#4f46e5', '#0284c7', '#7c3aed'
    ];
    
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <div style={{ position: 'relative' }}>
      <div 
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        {/* Avatar */}
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          background: avatarUrl ? 'transparent' : getAvatarColor(name),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '0.9rem',
          border: '2px solid white',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          {avatarUrl ? (
            <img 
              src={avatarUrl} 
              alt={name}
              style={{ 
                width: '100%', 
                height: '100%', 
                borderRadius: '50%', 
                objectFit: 'cover' 
              }} 
            />
          ) : initials}
        </div>
        
        {/* Name and Role */}
        <div>
          <div style={{ 
            fontSize: '0.85rem', 
            fontWeight: 'bold',
            color: '#1f2937',
            lineHeight: '1.2'
          }}>
            {name}
          </div>
          <div style={{ 
            fontSize: '0.7rem', 
            color: '#6b7280',
            lineHeight: '1.2'
          }}>
            {role}
          </div>
        </div>

        {/* Dropdown indicator */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          style={{
            marginLeft: '4px',
            color: '#6b7280',
            transform: menuOpen ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.2s ease'
          }}
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>

      {/* Dropdown menu */}
      {menuOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          right: 0,
          marginTop: '8px',
          background: 'white',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          borderRadius: '8px',
          width: '200px',
          zIndex: 1000
        }}>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid #f3f4f6' }}>
            <div style={{ 
              fontSize: '0.9rem', 
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '2px'
            }}>
              {name}
            </div>
            <div style={{ 
              fontSize: '0.75rem', 
              color: '#6b7280'
            }}>
              Último acesso: 2025-06-06 12:14:06
            </div>
          </div>
          <div style={{ padding: '8px 0' }}>
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              width: '100%',
              textAlign: 'left',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: '#4b5563',
              fontSize: '0.85rem',
              fontFamily: 'inherit'
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              Perfil
            </button>
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              width: '100%',
              textAlign: 'left',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: '#4b5563',
              fontSize: '0.85rem',
              fontFamily: 'inherit'
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"></path>
                <path d="m12 16 4-4-4-4"></path>
                <path d="M8 12h8"></path>
              </svg>
              Sair
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;