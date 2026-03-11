import React from 'react';

const Sidebar = () => {
  return (
    <div style={{width: 256, alignSelf: 'stretch', background: 'white', borderRight: '1px rgba(69, 87, 104, 0.10) solid', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start', display: 'inline-flex'}}>
      {/* Logo Area */}
      <div style={{alignSelf: 'stretch', padding: 24, justifyContent: 'flex-start', alignItems: 'center', gap: 12, display: 'inline-flex'}}>
        <div style={{width: 40, height: 40, background: '#455768', borderRadius: 8, justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
          <div style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
            <div style={{width: 20, height: 20, background: 'white'}} />
          </div>
        </div>
        <div style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 4, display: 'inline-flex'}}>
          <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
            <div style={{width: 72.95, height: 18, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#455768', fontSize: 18, fontFamily: 'Inter', fontWeight: '700', lineHeight: 18, wordWrap: 'break-word'}}>TexFlow</div>
          </div>
          <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
            <div style={{width: 84.02, height: 16, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#64748B', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>Enterprise ERP</div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div style={{alignSelf: 'stretch', flex: '1 1 0', padding: 16, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'flex'}}>
        {/* Dashboard Active */}
        <div style={{alignSelf: 'stretch', paddingLeft: 12, paddingRight: 12, paddingTop: 8, paddingBottom: 8, background: '#455768', borderRadius: 8, justifyContent: 'flex-start', alignItems: 'center', gap: 12, display: 'inline-flex'}}>
          <div style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
            <div style={{width: 18, height: 18, background: 'white'}} />
          </div>
          <div style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
            <div style={{width: 73.02, height: 20, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'white', fontSize: 14, fontFamily: 'Inter', fontWeight: '500', lineHeight: 20, wordWrap: 'break-word'}}>Dashboard</div>
          </div>
        </div>

        {/* Orders */}
        <div style={{alignSelf: 'stretch', paddingLeft: 12, paddingRight: 12, paddingTop: 8, paddingBottom: 8, borderRadius: 8, justifyContent: 'flex-start', alignItems: 'center', gap: 12, display: 'inline-flex'}}>
          <div style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
            <div style={{width: 19.98, height: 20, background: '#475569'}} />
          </div>
          <div style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
            <div style={{width: 45.72, height: 20, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#475569', fontSize: 14, fontFamily: 'Inter', fontWeight: '500', lineHeight: 20, wordWrap: 'break-word'}}>Orders</div>
          </div>
        </div>

        {/* Inventory */}
        <div style={{alignSelf: 'stretch', paddingLeft: 12, paddingRight: 12, paddingTop: 8, paddingBottom: 8, borderRadius: 8, justifyContent: 'flex-start', alignItems: 'center', gap: 12, display: 'inline-flex'}}>
          <div style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
            <div style={{width: 20, height: 20, background: '#475569'}} />
          </div>
          <div style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
            <div style={{width: 63.22, height: 20, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#475569', fontSize: 14, fontFamily: 'Inter', fontWeight: '500', lineHeight: 20, wordWrap: 'break-word'}}>Inventory</div>
          </div>
        </div>

        {/* Production */}
        <div style={{alignSelf: 'stretch', paddingLeft: 12, paddingRight: 12, paddingTop: 8, paddingBottom: 8, borderRadius: 8, justifyContent: 'flex-start', alignItems: 'center', gap: 12, display: 'inline-flex'}}>
          <div style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
            <div style={{width: 18.03, height: 18.51, background: '#475569'}} />
          </div>
          <div style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
            <div style={{width: 72.92, height: 20, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#475569', fontSize: 14, fontFamily: 'Inter', fontWeight: '500', lineHeight: 20, wordWrap: 'break-word'}}>Production</div>
          </div>
        </div>

        {/* Quality Control */}
        <div style={{alignSelf: 'stretch', paddingLeft: 12, paddingRight: 12, paddingTop: 8, paddingBottom: 8, borderRadius: 8, justifyContent: 'flex-start', alignItems: 'center', gap: 12, display: 'inline-flex'}}>
          <div style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
            <div style={{width: 16, height: 20, background: '#475569'}} />
          </div>
          <div style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
            <div style={{width: 100.06, height: 20, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#475569', fontSize: 14, fontFamily: 'Inter', fontWeight: '500', lineHeight: 20, wordWrap: 'break-word'}}>Quality Control</div>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div style={{alignSelf: 'stretch', padding: 16, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
        <div style={{alignSelf: 'stretch', padding: 16, background: 'rgba(69, 87, 104, 0.05)', borderRadius: 12, outline: '1px rgba(69, 87, 104, 0.10) solid', outlineOffset: '-1px', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'flex'}}>
          <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
            <div style={{alignSelf: 'stretch', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#455768', fontSize: 12, fontFamily: 'Inter', fontWeight: '600', textTransform: 'uppercase', lineHeight: 16, letterSpacing: 0.60, wordWrap: 'break-word'}}>System Status</div>
          </div>
          <div style={{alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
            <div style={{width: 8, height: 8, background: '#10B981', borderRadius: 9999}} />
            <div style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
              <div style={{width: 131.47, height: 16, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#64748B', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>All systems operational</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;