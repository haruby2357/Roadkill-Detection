export type RiskLevel = '즉시 확인' | '순차 확인' | '후순위 확인';
export type EventStatus = '미확인' | '확인 중' | '출동 요청' | '출동 중' | '처리 완료' | '오탐 처리';

export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface RoadkillEvent {
  id: string;
  riskLevel: RiskLevel;
  detectedAt: string;
  location: string;
  objectType: string;
  status: EventStatus;
  description: string;
  cameraId: string;
  repeatDetection: boolean;
  lastDetectedAt: string;
  imageUrl: string;
  boundingBox: BoundingBox;
}
