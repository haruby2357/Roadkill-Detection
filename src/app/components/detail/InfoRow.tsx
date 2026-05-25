import type { ReactNode } from 'react';

interface InfoRowProps {
  icon: ReactNode;
  label: string;
  value: string;
  valueColor?: string;
  full?: boolean;
}

export function InfoRow({ icon, label, value, valueColor, full }: InfoRowProps) {
  return (
    <div style={{ gridColumn: full ? '1 / -1' : undefined }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#64748b', fontSize: '11px', marginBottom: '4px' }}>
        {icon}
        {label}
      </div>
      <div style={{ color: valueColor || '#cbd5e1', fontSize: '13px', fontWeight: 500 }}>{value}</div>
    </div>
  );
}
