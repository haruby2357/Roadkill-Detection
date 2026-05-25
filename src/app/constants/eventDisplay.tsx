import type { ReactNode } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Eye,
  Activity,
  Send,
  Navigation,
  RotateCcw,
} from 'lucide-react';
import type { EventStatus, RiskLevel } from '../types/events';

export const STATUS_STEPS: EventStatus[] = ['미확인', '확인 중', '출동 요청', '출동 중', '처리 완료'];

export const RISK_ORDER: Record<RiskLevel, number> = {
  '즉시 확인': 0,
  '순차 확인': 1,
  '후순위 확인': 2,
};

export const STATUS_ORDER: Record<EventStatus, number> = {
  '미확인': 0,
  '확인 중': 1,
  '출동 요청': 2,
  '출동 중': 3,
  '처리 완료': 4,
  '오탐 처리': 5,
};

export const RISK_DISPLAY: Record<RiskLevel, { color: string; bg: string; border: string; dot: string; icon: ReactNode; label: string }> = {
  '즉시 확인': {
    color: '#ef4444',
    bg: 'rgba(239,68,68,0.12)',
    border: 'rgba(239,68,68,0.3)',
    dot: '#ef4444',
    icon: <AlertTriangle size={12} />,
    label: '높음',
  },
  '순차 확인': {
    color: '#f97316',
    bg: 'rgba(249,115,22,0.12)',
    border: 'rgba(249,115,22,0.3)',
    dot: '#f97316',
    icon: <Clock size={12} />,
    label: '중간',
  },
  '후순위 확인': {
    color: '#64748b',
    bg: 'rgba(100,116,139,0.12)',
    border: 'rgba(100,116,139,0.3)',
    dot: '#64748b',
    icon: <Eye size={12} />,
    label: '낮음',
  },
};

export const STATUS_DISPLAY: Record<EventStatus, { color: string; bg: string; border: string; icon: ReactNode; label: string }> = {
  '미확인': {
    color: '#94a3b8', bg: 'rgba(148,163,184,0.12)', border: 'rgba(148,163,184,0.3)',
    icon: <Eye size={14} />, label: '미확인'
  },
  '확인 중': {
    color: '#3b82f6', bg: 'rgba(59,130,246,0.12)', border: 'rgba(59,130,246,0.3)',
    icon: <Activity size={14} />, label: '확인 중'
  },
  '출동 요청': {
    color: '#f97316', bg: 'rgba(249,115,22,0.12)', border: 'rgba(249,115,22,0.3)',
    icon: <Send size={14} />, label: '출동 요청'
  },
  '출동 중': {
    color: '#f59e0b', bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.3)',
    icon: <Navigation size={14} />, label: '출동 중'
  },
  '처리 완료': {
    color: '#22c55e', bg: 'rgba(34,197,94,0.12)', border: 'rgba(34,197,94,0.3)',
    icon: <CheckCircle2 size={14} />, label: '처리 완료'
  },
  '오탐 처리': {
    color: '#64748b', bg: 'rgba(100,116,139,0.12)', border: 'rgba(100,116,139,0.3)',
    icon: <RotateCcw size={14} />, label: '오탐 처리'
  },
};
