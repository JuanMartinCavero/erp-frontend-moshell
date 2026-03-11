import React from 'react';

const ProductionChart = () => {
  return (
    <div style={{width: 629.33, alignSelf: 'stretch', padding: 24, background: 'white', boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)', borderRadius: 12, outline: '1px rgba(69, 87, 104, 0.10) solid', outlineOffset: '-1px', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 32, display: 'inline-flex'}}>
      <div style={{alignSelf: 'stretch', justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex'}}>
        <div style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
          <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
            <div style={{width: 157.52, height: 28, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#0F172A', fontSize: 18, fontFamily: 'Inter', fontWeight: '700', lineHeight: 28, wordWrap: 'break-word'}}>Production Status</div>
          </div>
          <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
            <div style={{width: 288.44, height: 20, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#64748B', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Output units by department - Last 24 Hours</div>
          </div>
        </div>
        <div style={{width: 73, height: 28, position: 'relative', background: '#F1F5F9', borderRadius: 8}}>
          <div style={{width: 73, height: 28, paddingTop: 3.50, paddingBottom: 3.50, paddingLeft: 44, paddingRight: 8, left: 0, top: 0, position: 'absolute', overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', display: 'inline-flex'}}>
            <div style={{width: 21, height: 21, position: 'relative', overflow: 'hidden'}}>
              <div style={{width: 8.40, height: 4.20, left: 6.30, top: 8.40, position: 'absolute', outline: '1.57px #6B7280 solid', outlineOffset: '-0.79px'}} />
            </div>
          </div>
          <div style={{paddingRight: 0.58, left: 12, top: 4, position: 'absolute', overflow: 'hidden', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
            <div style={{width: 48.42, height: 20, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#475569', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Weekly</div>
          </div>
        </div>
      </div>
      <div style={{alignSelf: 'stretch', height: 256, paddingLeft: 16, paddingRight: 16, justifyContent: 'space-between', alignItems: 'flex-end', display: 'inline-flex'}}>
        <div style={{flex: '1 1 0', paddingTop: 16, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
          <div style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
            <div style={{width: 62.94, height: 16, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#64748B', fontSize: 12, fontFamily: 'Inter', fontWeight: '600', textTransform: 'uppercase', lineHeight: 16, letterSpacing: 0.60, wordWrap: 'break-word'}}>Knitting</div>
          </div>
        </div>
        <div style={{flex: '1 1 0', paddingTop: 16, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
          <div style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
            <div style={{width: 55.11, height: 16, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#64748B', fontSize: 12, fontFamily: 'Inter', fontWeight: '600', textTransform: 'uppercase', lineHeight: 16, letterSpacing: 0.60, wordWrap: 'break-word'}}>Ironing</div>
          </div>
        </div>
        <div style={{flex: '1 1 0', paddingTop: 16, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
          <div style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
            <div style={{width: 66.39, height: 16, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#64748B', fontSize: 12, fontFamily: 'Inter', fontWeight: '600', textTransform: 'uppercase', lineHeight: 16, letterSpacing: 0.60, wordWrap: 'break-word'}}>Finishing</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductionChart;