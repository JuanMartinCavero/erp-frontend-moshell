import React from 'react';

const Header = () => {
  return (
    <div style={{alignSelf: 'stretch', height: 41, paddingLeft: 32, paddingRight: 32, background: 'white', borderBottom: '1px rgba(69, 87, 104, 0.10) solid', justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex'}}>
      {/* Left side: Title and Search */}
      <div style={{flex: '1 1 0', justifyContent: 'flex-start', alignItems: 'center', gap: 24, display: 'flex'}}>
        <div style={{width: 193.98, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
          <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
            <div style={{width: 193.98, height: 28, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#1E293B', fontSize: 20, fontFamily: 'Inter', fontWeight: '700', lineHeight: 28, wordWrap: 'break-word'}}>Executive Overview</div>
          </div>
        </div>
        
        {/* Search Input */}
        <div style={{width: 448, maxWidth: 448, position: 'relative', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
          <div style={{alignSelf: 'stretch', paddingTop: 9, paddingBottom: 10, paddingLeft: 40, paddingRight: 16, background: '#F1F5F9', overflow: 'hidden', borderRadius: 8, justifyContent: 'center', alignItems: 'flex-start', display: 'inline-flex'}}>
            <div style={{flex: '1 1 0', overflow: 'hidden', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
              <div style={{alignSelf: 'stretch', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#6B7280', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>Search analytics, orders, machines...</div>
            </div>
          </div>
          <div style={{height: 24, left: 12, top: 6, position: 'absolute', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
            <div style={{width: 18, height: 18, background: '#94A3B8'}} />
          </div>
        </div>
      </div>

      {/* Right side: Icons and User */}
      <div style={{justifyContent: 'flex-start', alignItems: 'center', gap: 16, display: 'flex'}}>
        {/* Notification Icon */}
        <div style={{width: 40, height: 40, position: 'relative', borderRadius: 8, justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
          <div style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
            <div style={{width: 16, height: 20, background: '#475569'}} />
          </div>
          <div style={{width: 8, height: 8, left: 24, top: 8, position: 'absolute', background: '#EF4444', borderRadius: 9999, border: '2px white solid'}} />
        </div>

        {/* Settings Icon */}
        <div style={{width: 40, height: 40, borderRadius: 8, justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
          <div style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
            <div style={{width: 20.10, height: 20, background: '#475569'}} />
          </div>
        </div>

        {/* Divider */}
        <div style={{width: 17, height: 32, paddingLeft: 8, paddingRight: 8, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
          <div style={{width: 1, height: 32, background: '#E2E8F0'}} />
        </div>

        {/* User Info */}
        <div style={{justifyContent: 'flex-start', alignItems: 'center', gap: 11.99, display: 'flex'}}>
          <div style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 4, display: 'inline-flex'}}>
            <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-end', display: 'flex'}}>
              <div style={{width: 94.66, height: 14, textAlign: 'right', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#0F172A', fontSize: 14, fontFamily: 'Inter', fontWeight: '600', lineHeight: 14, wordWrap: 'break-word'}}>James Wilson</div>
            </div>
            <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-end', display: 'flex'}}>
              <div style={{width: 27.13, height: 16, textAlign: 'right', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#64748B', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>COO</div>
            </div>
          </div>
          <img style={{width: 40, height: 40, background: 'rgba(69, 87, 104, 0.20)', borderRadius: 9999}} src="https://placehold.co/40x40" alt="User" />
        </div>
      </div>
    </div>
  );
};

export default Header;