import { 
  mockDashboardStats, 
  mockQuickActions, 
  mockRecentRequests, 
  mockMetrics, 
  mockRoutePerformance 
} from './dashboard.mocks'
import type { 
  DashboardStat, 
  QuickAction, 
  RecentRequest, 
  Metrics, 
  RoutePerformance 
} from './dashboard.model'

export async function getDashboardStats(): Promise<DashboardStat[]> {
  await new Promise(resolve => setTimeout(resolve, 500))
  return mockDashboardStats
}

export async function getQuickActions(): Promise<QuickAction[]> {
  await new Promise(resolve => setTimeout(resolve, 200))
  return mockQuickActions
}

export async function getRecentRequests(): Promise<RecentRequest[]> {
  await new Promise(resolve => setTimeout(resolve, 600))
  return mockRecentRequests
}

export async function getMetrics(): Promise<Metrics> {
  await new Promise(resolve => setTimeout(resolve, 800))
  return mockMetrics
}

export async function getRoutePerformance(): Promise<RoutePerformance[]> {
  await new Promise(resolve => setTimeout(resolve, 700))
  return mockRoutePerformance
}

export async function generateReports(dateRange: { from: string; to: string }) {
  await new Promise(resolve => setTimeout(resolve, 2000))
  console.log('Generating reports for date range:', dateRange)
  return { success: true }
}

export async function exportReport(format: string) {
  await new Promise(resolve => setTimeout(resolve, 1500))
  console.log(`Exporting report in ${format} format`)
  return { success: true }
} 