export default function Toast({ message, show, icon: Icon }) {
  return (
    <div className={`toast${show ? ' show' : ''}`}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
        {Icon ? <Icon size={18} /> : null}
        <span>{message}</span>
      </div>
    </div>
  );
}
