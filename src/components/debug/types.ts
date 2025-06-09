
export interface DiagnosticResult {
  test: string;
  status: 'success' | 'error' | 'info';
  message: string;
  details?: any;
}
