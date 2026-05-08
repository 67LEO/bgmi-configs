export default function AdBanner() {
  return (
    <div className="ad-container" style={{ minHeight: 100, background: 'rgba(26, 26, 46, 0.5)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed rgba(255,255,255,0.05)', margin: '24px 0' }}>
      <div style={{ textAlign: 'center', color: '#555', fontSize: '0.9rem', padding: 20 }}>
        <div style={{ fontSize: '1.5rem', marginBottom: 4 }}>📢</div>
        PropellerAds Banner<br />
        <span style={{ fontSize: '0.78rem', color: '#444' }}>
          Replace this with your ad code from PropellerAds dashboard
        </span>
      </div>
    </div>
  )
}
