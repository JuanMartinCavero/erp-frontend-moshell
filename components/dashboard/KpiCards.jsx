import React from 'react';

const KpiCards = () => {
  return (
    <div style={{alignSelf: 'stretch', justifyContent: 'center', alignItems: 'flex-start', gap: 24, display: 'inline-flex'}}>
      {/* Card 1: Orders in Progress */}
      <div style={{flex: '1 1 0', alignSelf: 'stretch', padding: 24, background: 'white', boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)', borderRadius: 12, outline: '1px rgba(69, 87, 104, 0.10) solid', outlineOffset: '-1px', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 16, display: 'inline-flex'}}>
        <div style={{alignSelf: 'stretch', justifyContent: 'space-between', alignItems: 'flex-start', display: 'inline-flex'}}>
          <div style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 4, display: 'inline-flex'}}>
            <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
              <div style={{width: 124.84, height: 20, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#64748B', fontSize: 14, fontFamily: 'Inter', fontWeight: '500', lineHeight: 20, wordWrap: 'break-word'}}>Orders in Progress</div>
            </div>
            <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
              <div style={{width: 41.33, height: 32, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#0F172A', fontSize: 24, fontFamily: 'Inter', fontWeight: '700', lineHeight: 32, wordWrap: 'break-word'}}>124</div>
            </div>
          </div>
          <div style={{padding: 8, background: '#EFF6FF', borderRadius: 8, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
            <div style={{width: 19, height: 21, background: '#2563EB'}} />
          </div>
        </div>
        <div style={{alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center', gap: 4, display: 'inline-flex'}}>
          <div style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
            <div style={{width: 11.67, height: 7, background: '#059669'}} />
          </div>
          <div style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
            <div style={{width: 50.22, height: 20, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#059669', fontSize: 14, fontFamily: 'Inter', fontWeight: '500', lineHeight: 20, wordWrap: 'break-word'}}>+12.5%</div>
          </div>
          <div style={{paddingLeft: 4, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
            <div style={{width: 88.16, height: 20, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#94A3B8', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>vs last month</div>
          </div>
        </div>
      </div>

      {/* Card 2: Active Production Lines */}
      <div style={{flex: '1 1 0', alignSelf: 'stretch', position: 'relative', background: 'white', boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)', borderRadius: 12, outline: '1px rgba(69, 87, 104, 0.10) solid', outlineOffset: '-1px'}}>
        <div style={{width: 172, left: 25, top: 25, position: 'absolute', justifyContent: 'space-between', alignItems: 'flex-start', display: 'inline-flex'}}>
          <div style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 4, display: 'inline-flex'}}>
            <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
              <div style={{width: 118.84, height: 40, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#64748B', fontSize: 14, fontFamily: 'Inter', fontWeight: '500', lineHeight: 20, wordWrap: 'break-word'}}>Active Production<br/>Lines</div>
            </div>
            <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
              <div style={{width: 66.27, height: 32, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#0F172A', fontSize: 24, fontFamily: 'Inter', fontWeight: '700', lineHeight: 32, wordWrap: 'break-word'}}>18/24</div>
            </div>
          </div>
          <div style={{padding: 8, background: '#ECFDF5', borderRadius: 8, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
            <div style={{width: 21.17, height: 20, background: '#059669'}} />
          </div>
        </div>
        <div style={{width: 172, height: 8, left: 25, top: 117, position: 'absolute', background: '#F1F5F9', overflow: 'hidden', borderRadius: 9999}}>
          <div style={{width: 129, height: 8, left: 0, top: 0, position: 'absolute', background: '#455768', borderRadius: 9999}} />
        </div>
        <div style={{width: 172, left: 25, top: 133, position: 'absolute', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
          <div style={{width: 138.77, height: 16, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#94A3B8', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>75% Capacity Utilization</div>
        </div>
      </div>

      {/* Card 3: Low Stock Alerts */}
      <div style={{flex: '1 1 0', alignSelf: 'stretch', padding: 24, background: 'white', boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)', borderRadius: 12, outline: '1px rgba(69, 87, 104, 0.10) solid', outlineOffset: '-1px', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 16, display: 'inline-flex'}}>
        <div style={{alignSelf: 'stretch', justifyContent: 'space-between', alignItems: 'flex-start', display: 'inline-flex'}}>
          <div style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 4, display: 'inline-flex'}}>
            <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
              <div style={{width: 112.77, height: 20, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#64748B', fontSize: 14, fontFamily: 'Inter', fontWeight: '500', lineHeight: 20, wordWrap: 'break-word'}}>Low Stock Alerts</div>
            </div>
            <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
              <div style={{width: 25.47, height: 32, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#0F172A', fontSize: 24, fontFamily: 'Inter', fontWeight: '700', lineHeight: 32, wordWrap: 'break-word'}}>12</div>
            </div>
          </div>
          <div style={{padding: 8, background: '#FFFBEB', borderRadius: 8, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
            <div style={{width: 22, height: 19, background: '#D97706'}} />
          </div>
        </div>
        <div style={{alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center', gap: 4, display: 'inline-flex'}}>
          <div style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
            <div style={{width: 2.33, height: 10.50, background: '#D97706'}} />
          </div>
          <div style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
            <div style={{width: 123.13, height: 20, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#D97706', fontSize: 14, fontFamily: 'Inter', fontWeight: '500', lineHeight: 20, wordWrap: 'break-word'}}>Requires Attention</div>
          </div>
        </div>
      </div>

      {/* Card 4: Pending Deliveries */}
      <div style={{flex: '1 1 0', alignSelf: 'stretch', padding: 24, background: 'white', boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)', borderRadius: 12, outline: '1px rgba(69, 87, 104, 0.10) solid', outlineOffset: '-1px', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 16, display: 'inline-flex'}}>
        <div style={{alignSelf: 'stretch', justifyContent: 'space-between', alignItems: 'flex-start', display: 'inline-flex'}}>
          <div style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 4, display: 'inline-flex'}}>
            <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
              <div style={{width: 124.77, height: 20, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#64748B', fontSize: 14, fontFamily: 'Inter', fontWeight: '500', lineHeight: 20, wordWrap: 'break-word'}}>Pending Deliveries</div>
            </div>
            <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
              <div style={{width: 31.17, height: 32, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#0F172A', fontSize: 24, fontFamily: 'Inter', fontWeight: '700', lineHeight: 32, wordWrap: 'break-word'}}>45</div>
            </div>
          </div>
          <div style={{padding: 8, background: '#EEF2FF', borderRadius: 8, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
            <div style={{width: 22, height: 16, background: '#4F46E5'}} />
          </div>
        </div>
        <div style={{alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center', gap: 4, display: 'inline-flex'}}>
          <div style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
            <div style={{width: 87.02, height: 20, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#059669', fontSize: 14, fontFamily: 'Inter', fontWeight: '500', lineHeight: 20, wordWrap: 'break-word'}}>8 dispatched</div>
          </div>
          <div style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
            <div style={{width: 36.94, height: 20, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#64748B', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>today</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KpiCards;