import React from 'react';

const OrdersTable = () => {
  return (
    <div style={{alignSelf: 'stretch', background: 'white', boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)', overflow: 'hidden', borderRadius: 12, outline: '1px rgba(69, 87, 104, 0.10) solid', outlineOffset: '-1px', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
      {/* Header */}
      <div style={{alignSelf: 'stretch', padding: 24, borderBottom: '1px rgba(69, 87, 104, 0.10) solid', justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex'}}>
        <div style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
          <div style={{width: 125.95, height: 28, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#0F172A', fontSize: 18, fontFamily: 'Inter', fontWeight: '700', lineHeight: 28, wordWrap: 'break-word'}}>Recent Orders</div>
        </div>
        <div style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}>
          <div style={{width: 104.52, height: 20, textAlign: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#455768', fontSize: 14, fontFamily: 'Inter', fontWeight: '600', lineHeight: 20, wordWrap: 'break-word'}}>View All Orders</div>
        </div>
      </div>

      {/* Table */}
      <div style={{alignSelf: 'stretch', overflow: 'hidden', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
        {/* Table Head */}
        <div style={{alignSelf: 'stretch', background: '#F8FAFC', justifyContent: 'center', alignItems: 'flex-start', display: 'inline-flex'}}>
          <div style={{width: 208.98, paddingLeft: 24, paddingRight: 24, paddingTop: 16, paddingBottom: 16, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
            <div style={{width: 60.64, height: 16, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#64748B', fontSize: 12, fontFamily: 'Inter', fontWeight: '700', textTransform: 'uppercase', lineHeight: 16, letterSpacing: 0.60, wordWrap: 'break-word'}}>Order ID</div>
          </div>
          <div style={{width: 259.50, paddingLeft: 24, paddingRight: 24, paddingTop: 16, paddingBottom: 16, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
            <div style={{width: 47.08, height: 16, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#64748B', fontSize: 12, fontFamily: 'Inter', fontWeight: '700', textTransform: 'uppercase', lineHeight: 16, letterSpacing: 0.60, wordWrap: 'break-word'}}>Client</div>
          </div>
          <div style={{width: 196.41, paddingLeft: 24, paddingRight: 24, paddingTop: 16, paddingBottom: 16, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
            <div style={{width: 50.86, height: 16, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#64748B', fontSize: 12, fontFamily: 'Inter', fontWeight: '700', textTransform: 'uppercase', lineHeight: 16, letterSpacing: 0.60, wordWrap: 'break-word'}}>Status</div>
          </div>
          <div style={{width: 151.27, paddingLeft: 24, paddingRight: 24, paddingTop: 16, paddingBottom: 16, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
            <div style={{width: 61.22, height: 16, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#64748B', fontSize: 12, fontFamily: 'Inter', fontWeight: '700', textTransform: 'uppercase', lineHeight: 16, letterSpacing: 0.60, wordWrap: 'break-word'}}>Priority</div>
          </div>
          <div style={{width: 141.84, paddingLeft: 24, paddingRight: 24, paddingTop: 16, paddingBottom: 16, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-end', display: 'inline-flex'}}>
            <div style={{width: 59.17, height: 16, textAlign: 'right', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#64748B', fontSize: 12, fontFamily: 'Inter', fontWeight: '700', textTransform: 'uppercase', lineHeight: 16, letterSpacing: 0.60, wordWrap: 'break-word'}}>Actions</div>
          </div>
        </div>

        {/* Table Rows */}
        <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
          {/* Row 1 */}
          <div style={{alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center', gap: 24, display: 'inline-flex'}}>
            <div style={{width: 208.98, paddingTop: 19.50, paddingBottom: 21, paddingLeft: 24, paddingRight: 24, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
              <div style={{width: 109.77, height: 20, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#0F172A', fontSize: 14, fontFamily: 'Inter', fontWeight: '500', lineHeight: 20, wordWrap: 'break-word'}}>ORD-2024-8812</div>
            </div>
            <div style={{width: 211.50, justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
              <div style={{width: 24, height: 24, background: '#E2E8F0', borderRadius: 9999, justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
                <div style={{width: 13.17, height: 12, textAlign: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#0F172A', fontSize: 10, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word'}}>GL</div>
              </div>
              <div style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
                <div style={{width: 116.13, height: 20, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#0F172A', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Global Linens Co.</div>
              </div>
            </div>
            <div style={{width: 196.41, paddingTop: 20, paddingBottom: 20.50, paddingLeft: 24, paddingRight: 24, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
              <div style={{paddingLeft: 10, paddingRight: 10, paddingTop: 2, paddingBottom: 2, background: '#DBEAFE', borderRadius: 9999, justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
                <div style={{width: 62.50, height: 16, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#1E40AF', fontSize: 12, fontFamily: 'Inter', fontWeight: '500', lineHeight: 16, wordWrap: 'break-word'}}>Production</div>
              </div>
            </div>
            <div style={{width: 127.27, paddingTop: 20, paddingBottom: 20.50, paddingRight: 24, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
              <div style={{paddingLeft: 10, paddingRight: 10, paddingTop: 2, paddingBottom: 2, background: '#FEE2E2', borderRadius: 9999, justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
                <div style={{width: 26.63, height: 16, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#991B1B', fontSize: 12, fontFamily: 'Inter', fontWeight: '500', lineHeight: 16, wordWrap: 'break-word'}}>High</div>
              </div>
            </div>
            <div style={{width: 117.84, paddingLeft: 24, paddingRight: 24, paddingTop: 16, paddingBottom: 16, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-end', display: 'inline-flex'}}>
              <div style={{justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}>
                <div style={{justifyContent: 'center', alignItems: 'flex-start', display: 'flex'}}>
                  <div style={{width: 3.33, height: 13.33, background: '#94A3B8'}} />
                </div>
              </div>
            </div>
          </div>

          {/* Row 2 */}
          <div style={{alignSelf: 'stretch', borderTop: '1px rgba(69, 87, 104, 0.05) solid', justifyContent: 'center', alignItems: 'center', gap: 24, display: 'inline-flex'}}>
            <div style={{width: 208.98, paddingTop: 20, paddingBottom: 21, paddingLeft: 24, paddingRight: 24, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
              <div style={{width: 109.58, height: 20, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#0F172A', fontSize: 14, fontFamily: 'Inter', fontWeight: '500', lineHeight: 20, wordWrap: 'break-word'}}>ORD-2024-8815</div>
            </div>
            <div style={{width: 211.50, justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
              <div style={{width: 24, height: 24, background: '#E2E8F0', borderRadius: 9999, justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
                <div style={{width: 14.06, height: 12, textAlign: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#0F172A', fontSize: 10, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word'}}>TX</div>
              </div>
              <div style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
                <div style={{width: 111.05, height: 20, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#0F172A', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>TexStyle Exports</div>
              </div>
            </div>
            <div style={{width: 196.41, paddingLeft: 24, paddingRight: 24, paddingTop: 20.50, paddingBottom: 20.50, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
              <div style={{paddingLeft: 10, paddingRight: 10, paddingTop: 2, paddingBottom: 2, background: '#D1FAE5', borderRadius: 9999, justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
                <div style={{width: 80.44, height: 16, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#065F46', fontSize: 12, fontFamily: 'Inter', fontWeight: '500', lineHeight: 16, wordWrap: 'break-word'}}>Quality Check</div>
              </div>
            </div>
            <div style={{width: 127.27, paddingTop: 20.50, paddingBottom: 20.50, paddingRight: 24, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
              <div style={{paddingLeft: 10, paddingRight: 10, paddingTop: 2, paddingBottom: 2, background: '#F1F5F9', borderRadius: 9999, justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
                <div style={{width: 46.33, height: 16, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#1E293B', fontSize: 12, fontFamily: 'Inter', fontWeight: '500', lineHeight: 16, wordWrap: 'break-word'}}>Medium</div>
              </div>
            </div>
            <div style={{width: 117.84, paddingLeft: 24, paddingRight: 24, paddingTop: 16.50, paddingBottom: 16.50, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-end', display: 'inline-flex'}}>
              <div style={{justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}>
                <div style={{justifyContent: 'center', alignItems: 'flex-start', display: 'flex'}}>
                  <div style={{width: 3.33, height: 13.33, background: '#94A3B8'}} />
                </div>
              </div>
            </div>
          </div>

          {/* Row 3 */}
          <div style={{alignSelf: 'stretch', borderTop: '1px rgba(69, 87, 104, 0.05) solid', justifyContent: 'center', alignItems: 'center', gap: 24, display: 'inline-flex'}}>
            <div style={{width: 208.98, paddingTop: 20, paddingBottom: 20.50, paddingLeft: 24, paddingRight: 24, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
              <div style={{width: 109.95, height: 20, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#0F172A', fontSize: 14, fontFamily: 'Inter', fontWeight: '500', lineHeight: 20, wordWrap: 'break-word'}}>ORD-2024-8819</div>
            </div>
            <div style={{width: 211.50, justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
              <div style={{width: 24, height: 24, background: '#E2E8F0', borderRadius: 9999, justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
                <div style={{width: 16.25, height: 12, textAlign: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#0F172A', fontSize: 10, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word'}}>WF</div>
              </div>
              <div style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
                <div style={{width: 91.95, height: 20, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#0F172A', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Wave Fashion</div>
              </div>
            </div>
            <div style={{width: 196.41, paddingTop: 20.50, paddingBottom: 20, paddingLeft: 24, paddingRight: 24, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
              <div style={{paddingLeft: 10, paddingRight: 10, paddingTop: 2, paddingBottom: 2, background: '#FEF3C7', borderRadius: 9999, justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
                <div style={{width: 47, height: 16, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#92400E', fontSize: 12, fontFamily: 'Inter', fontWeight: '500', lineHeight: 16, wordWrap: 'break-word'}}>Pending</div>
              </div>
            </div>
            <div style={{width: 127.27, paddingTop: 20.50, paddingBottom: 20, paddingRight: 24, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
              <div style={{paddingLeft: 10, paddingRight: 10, paddingTop: 2, paddingBottom: 2, background: '#F1F5F9', borderRadius: 9999, justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
                <div style={{width: 46.33, height: 16, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#1E293B', fontSize: 12, fontFamily: 'Inter', fontWeight: '500', lineHeight: 16, wordWrap: 'break-word'}}>Medium</div>
              </div>
            </div>
            <div style={{width: 117.84, paddingLeft: 24, paddingRight: 24, paddingTop: 16, paddingBottom: 16, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-end', display: 'inline-flex'}}>
              <div style={{justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}>
                <div style={{justifyContent: 'center', alignItems: 'flex-start', display: 'flex'}}>
                  <div style={{width: 3.33, height: 13.33, background: '#94A3B8'}} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersTable;