"use client"

import { useState, useEffect, Fragment } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Filter,
  Download,
  Phone,
  Calendar,
  RefreshCw,
  Users,
  Activity,
  CheckCircle2,
  Clock,
  ChevronDown,
  ChevronUp,
  MapPin,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Lead {
  id: string
  name: string
  phone: string
  email: string | null
  location: string | null
  area: string | null
  duration: string | null
  photoData: string | null
  branch: string | null
  source: string | null
  medium: string | null
  campaign: string | null
  pageUrl: string | null
  formSource: string | null
  status: "NEW" | "CONTACTED" | "SCHEDULED" | "CONVERTED" | "LOST"
  telecrmSynced: boolean
  telecrmId: string | null
  createdAt: string
  updatedAt: string
}

const STATUS_OPTIONS: Lead["status"][] = ["NEW", "CONTACTED", "SCHEDULED", "CONVERTED", "LOST"]

// the "hair-scan" bucket is exactly the ChatBooking widget on /hair-scan; every
// other formSource (Home CTA Form, Home Popup, or missing on older leads) is "landing"
const HAIR_SCAN_FORM_SOURCE = "Hair Scan Chat"

export default function LeadsDashboard() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [areaFilter, setAreaFilter] = useState<string>("all")
  const [pageView, setPageView] = useState<"landing" | "hairscan">("landing")
  const [dateFilter, setDateFilter] = useState<string>("all")
  const [expandedLead, setExpandedLead] = useState<string | null>(null)
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const fetchLeads = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/leads")
      const data = await response.json()
      if (response.ok) {
        setLeads(data.leads || [])
      } else {
        console.error("Failed to fetch leads:", data.error)
      }
    } catch (error) {
      console.error("Error fetching leads:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLeads()
  }, [])

  const safeString = (value: any): string => {
    if (value === null || value === undefined) return ""
    return String(value).toLowerCase()
  }

  const pageLeads = leads.filter((l) =>
    pageView === "hairscan" ? l.formSource === HAIR_SCAN_FORM_SOURCE : l.formSource !== HAIR_SCAN_FORM_SOURCE,
  )

  const sortedLeads = [...pageLeads].sort((a, b) => {
    if (!sortConfig) return 0
    const { key, direction } = sortConfig

    let aValue: string | number
    let bValue: string | number
    if (key === "createdAt" || key === "updatedAt") {
      aValue = new Date(a[key as keyof Lead] as string).getTime()
      bValue = new Date(b[key as keyof Lead] as string).getTime()
    } else {
      aValue = safeString(a[key as keyof Lead])
      bValue = safeString(b[key as keyof Lead])
    }

    if (aValue < bValue) return direction === "asc" ? -1 : 1
    if (aValue > bValue) return direction === "asc" ? 1 : -1
    return 0
  })

  function isWithinDateRange(date: string, range: string): boolean {
    if (!date) return false
    const leadDate = new Date(date)
    const now = new Date()
    switch (range) {
      case "today":
        return leadDate.toDateString() === now.toDateString()
      case "week": {
        const weekAgo = new Date(now)
        weekAgo.setDate(weekAgo.getDate() - 7)
        return leadDate >= weekAgo
      }
      case "month": {
        const monthAgo = new Date(now)
        monthAgo.setMonth(monthAgo.getMonth() - 1)
        return leadDate >= monthAgo
      }
      default:
        return true
    }
  }

  const filteredLeads = sortedLeads.filter((lead) => {
    const matchesSearch =
      safeString(lead.name).includes(safeString(searchTerm)) ||
      safeString(lead.phone).includes(safeString(searchTerm)) ||
      safeString(lead.location).includes(safeString(searchTerm)) ||
      safeString(lead.area).includes(safeString(searchTerm)) ||
      safeString(lead.duration).includes(safeString(searchTerm)) ||
      safeString(lead.source).includes(safeString(searchTerm)) ||
      safeString(lead.formSource).includes(safeString(searchTerm)) ||
      safeString(lead.campaign).includes(safeString(searchTerm))

    const matchesStatus = statusFilter === "all" || lead.status === statusFilter
    const matchesArea = areaFilter === "all" || lead.area === areaFilter
    const matchesDate = dateFilter === "all" || isWithinDateRange(lead.createdAt, dateFilter)

    return matchesSearch && matchesStatus && matchesArea && matchesDate
  })

  const uniqueAreas = Array.from(new Set(pageLeads.map((l) => l.area).filter(Boolean))) as string[]

  const stats = {
    total: pageLeads.length,
    new: pageLeads.filter((l) => l.status === "NEW").length,
    converted: pageLeads.filter((l) => l.status === "CONVERTED").length,
    synced: pageLeads.filter((l) => l.telecrmSynced).length,
  }

  const getStatusBadge = (status: Lead["status"]) => {
    const statusConfig = {
      NEW: { label: "New", color: "bg-blue-100 text-blue-800 border-blue-200" },
      CONTACTED: { label: "Contacted", color: "bg-yellow-100 text-yellow-800 border-yellow-200" },
      SCHEDULED: { label: "Scheduled", color: "bg-purple-100 text-purple-800 border-purple-200" },
      CONVERTED: { label: "Converted", color: "bg-green-100 text-green-800 border-green-200" },
      LOST: { label: "Lost", color: "bg-red-100 text-red-800 border-red-200" },
    }
    const config = statusConfig[status]
    return (
      <Badge variant="outline" className={`${config.color} border`}>
        {config.label}
      </Badge>
    )
  }

  const getStatusDot = (status: Lead["status"]) =>
    status === "NEW"
      ? "bg-blue-500"
      : status === "CONTACTED"
        ? "bg-yellow-500"
        : status === "SCHEDULED"
          ? "bg-purple-500"
          : status === "CONVERTED"
            ? "bg-green-500"
            : "bg-red-500"

  const getSyncBadge = (synced: boolean) =>
    synced ? (
      <Badge className="bg-green-100 text-green-800 border-green-200">Synced</Badge>
    ) : (
      <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
        Pending
      </Badge>
    )

  const exportToCSV = () => {
    const headers = [
      "Name",
      "Phone",
      "Email",
      "Location",
      "Area",
      "Duration",
      "Branch",
      "Source",
      "Form",
      "Medium",
      "Campaign",
      "Status",
      "TeleCRM Synced",
      "Page URL",
      "Created At",
    ]
    const csvData = filteredLeads.map((lead) => [
      lead.name || "",
      lead.phone || "",
      lead.email || "",
      lead.location || "",
      lead.area || "",
      lead.duration || "",
      lead.branch || "",
      lead.source || "",
      lead.formSource || "",
      lead.medium || "",
      lead.campaign || "",
      lead.status || "",
      lead.telecrmSynced ? "Yes" : "No",
      lead.pageUrl || "",
      isClient ? new Date(lead.createdAt).toLocaleString("en-IN") : lead.createdAt,
    ])

    const escape = (v: string) => `"${String(v).replace(/"/g, '""')}"`
    const csvContent = [headers, ...csvData].map((row) => row.map(escape).join(",")).join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `leads-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const handleCall = (phone: string) => {
    if (phone) window.open(`tel:${phone}`, "_self")
  }

  const handleSort = (key: string) => {
    setSortConfig((current) => ({
      key,
      direction: current?.key === key && current.direction === "asc" ? "desc" : "asc",
    }))
  }

  const toggleLeadExpansion = (leadId: string) => {
    setExpandedLead((current) => (current === leadId ? null : leadId))
  }

  const updateLeadStatus = async (leadId: string, newStatus: Lead["status"]) => {
    try {
      const response = await fetch(`/api/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })
      if (response.ok) {
        setLeads(leads.map((lead) => (lead.id === leadId ? { ...lead, status: newStatus } : lead)))
      }
    } catch (error) {
      console.error("Error updating lead status:", error)
    }
  }

  const formatDate = (dateString: string) => {
    if (!isClient || !dateString) return { date: "", time: "" }
    try {
      const date = new Date(dateString)
      return {
        date: date.toLocaleDateString("en-IN"),
        time: date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
      }
    } catch {
      return { date: "Invalid Date", time: "" }
    }
  }

  const statCards = [
    { label: "Total Leads", value: stats.total, icon: Users, color: "text-gray-700", ring: "bg-gray-100" },
    { label: "New", value: stats.new, icon: Activity, color: "text-blue-600", ring: "bg-blue-100" },
    { label: "Converted", value: stats.converted, icon: CheckCircle2, color: "text-green-600", ring: "bg-green-100" },
    { label: "TeleCRM Synced", value: stats.synced, icon: Clock, color: "text-purple-600", ring: "bg-purple-100" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-4">
      <Card className="w-full bg-white border-gray-200">
        <CardHeader className="border-b border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle className="text-2xl font-bold text-gray-900 uppercase">Reshape Leads Management</CardTitle>
              <CardDescription className="text-gray-600">
                Consultation requests from the the reshape booking form
              </CardDescription>
            </div>
            <img
              src="https://res.cloudinary.com/n0ccg2u6/image/upload/reshape-logo-removebg-preview_vv7uc4.png"
              alt="thereshape"
              className="h-13 w-auto"
            />
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={fetchLeads}
                disabled={loading}
                className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                {loading ? "Refreshing..." : "Refresh"}
              </Button>
              <Button onClick={exportToCSV} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white">
                <Download className="h-4 w-4" />
                Export CSV
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {/* Landing page vs Hair Scan leads switch */}
          <div className="mb-6 inline-flex rounded-lg border border-gray-200 bg-gray-50 p-1">
            <button
              type="button"
              onClick={() => setPageView("landing")}
              className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                pageView === "landing" ? "bg-blue-600 text-white shadow-sm" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Landing Page Leads
            </button>
            <button
              type="button"
              onClick={() => setPageView("hairscan")}
              className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                pageView === "hairscan" ? "bg-blue-600 text-white shadow-sm" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Hair Scan Leads
            </button>
          </div>

          {/* KPI cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {statCards.map(({ label, value, icon: Icon, color, ring }) => (
              <Card key={label} className="p-4 bg-white border-gray-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-500">{label}</div>
                    <div className="text-3xl font-bold text-gray-900 mt-1">{value}</div>
                  </div>
                  <div className={`h-10 w-10 rounded-full ${ring} flex items-center justify-center`}>
                    <Icon className={`h-5 w-5 ${color}`} />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search by name, phone, area, source..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
                />
              </div>
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="bg-white border-gray-300 text-gray-900">
                <Filter className="h-4 w-4 mr-2 text-gray-500" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-300 text-gray-900">
                <SelectItem value="all">All Status</SelectItem>
                {STATUS_OPTIONS.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s.charAt(0) + s.slice(1).toLowerCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={areaFilter} onValueChange={setAreaFilter}>
              <SelectTrigger className="bg-white border-gray-300 text-gray-900">
                <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                <SelectValue placeholder="Area" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-300 text-gray-900">
                <SelectItem value="all">All Areas</SelectItem>
                {uniqueAreas.map((area) => (
                  <SelectItem key={area} value={area}>
                    {area}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="bg-white border-gray-300 text-gray-900">
                <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                <SelectValue placeholder="Date" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-300 text-gray-900">
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="rounded-lg border border-gray-200 overflow-hidden">
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="h-12 px-4 text-left align-middle font-medium text-gray-700">Photo</th>
                    <th
                      className="h-12 px-4 text-left align-middle font-medium text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort("name")}
                    >
                      <div className="flex items-center gap-1">
                        Name
                        {sortConfig?.key === "name" &&
                          (sortConfig.direction === "asc" ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          ))}
                      </div>
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-gray-700">Phone</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-gray-700">Location</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-gray-700">Concern 1</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-gray-700">Concern 2</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-gray-700">Source</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-gray-700">Form</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-gray-700">Status</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-gray-700">Sync</th>
                    <th
                      className="h-12 px-4 text-left align-middle font-medium text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort("createdAt")}
                    >
                      <div className="flex items-center gap-1">
                        Date
                        {sortConfig?.key === "createdAt" &&
                          (sortConfig.direction === "asc" ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          ))}
                      </div>
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-gray-700">Call</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={12} className="p-8 text-center text-gray-500">
                        <div className="flex items-center justify-center gap-2">
                          <RefreshCw className="h-4 w-4 animate-spin" />
                          Loading leads...
                        </div>
                      </td>
                    </tr>
                  ) : filteredLeads.length === 0 ? (
                    <tr>
                      <td colSpan={12} className="p-8 text-center text-gray-500">
                        No leads found matching your criteria
                      </td>
                    </tr>
                  ) : (
                    filteredLeads.map((lead) => {
                      const formattedDate = formatDate(lead.createdAt)
                      return (
                        <Fragment key={lead.id}>
                          <tr
                            className="border-b border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
                            onClick={() => toggleLeadExpansion(lead.id)}
                          >
                            <td className="p-4 align-middle">
                              {lead.photoData ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                  src={lead.photoData}
                                  alt={`${lead.name || "Lead"}'s photo`}
                                  className="h-10 w-10 rounded-full border border-gray-200 object-cover"
                                />
                              ) : (
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-400">
                                  {lead.name ? lead.name.charAt(0).toUpperCase() : "?"}
                                </div>
                              )}
                            </td>
                            <td className="p-4 align-middle font-medium text-gray-900">
                              <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${getStatusDot(lead.status)}`} />
                                {lead.name || "Unknown"}
                              </div>
                            </td>
                            <td className="p-4 align-middle">
                              <div className="flex items-center gap-2">
                                <Phone className="h-3 w-3 text-blue-600" />
                                <span className="text-sm text-gray-700">{lead.phone || "No phone"}</span>
                              </div>
                            </td>
                            <td className="p-4 align-middle">
                              <span className="text-sm text-gray-700">{lead.location || "Not specified"}</span>
                            </td>
                            <td className="p-4 align-middle">
                              <span className="text-sm font-medium text-gray-900">{lead.area || "Not specified"}</span>
                            </td>
                            <td className="p-4 align-middle">
                              <span className="text-sm text-gray-700">{lead.duration || "—"}</span>
                            </td>
                            <td className="p-4 align-middle">
                              <span className="text-sm text-gray-700 capitalize">{lead.source || "direct"}</span>
                            </td>
                            <td className="p-4 align-middle">
                              <span className="text-sm text-gray-700">{lead.formSource || "Not specified"}</span>
                            </td>
                            <td className="p-4 align-middle">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <div className="cursor-pointer" onClick={(e) => e.stopPropagation()}>
                                    {getStatusBadge(lead.status)}
                                  </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-white border-gray-200 text-gray-900">
                                  {STATUS_OPTIONS.map((s) => (
                                    <DropdownMenuItem
                                      key={s}
                                      className="focus:bg-gray-100"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        updateLeadStatus(lead.id, s)
                                      }}
                                    >
                                      {s.charAt(0) + s.slice(1).toLowerCase()}
                                    </DropdownMenuItem>
                                  ))}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                            <td className="p-4 align-middle">{getSyncBadge(lead.telecrmSynced)}</td>
                            <td className="p-4 align-middle text-sm text-gray-600">
                              {formattedDate.date}
                              <br />
                              <span className="text-xs">{formattedDate.time}</span>
                            </td>
                            <td className="p-4 align-middle">
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleCall(lead.phone)
                                }}
                                disabled={!lead.phone}
                              >
                                <Phone className="h-3 w-3" />
                              </Button>
                            </td>
                          </tr>
                          {expandedLead === lead.id && (
                            <tr className="bg-gray-50 border-b border-gray-200">
                              <td colSpan={12} className="p-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <h4 className="font-medium text-gray-900 mb-2">Lead Details</h4>
                                    <div className="space-y-2 text-gray-700">
                                      <div>
                                        <span className="font-medium">Branch:</span> {lead.branch || "Reshape Clinic"}
                                      </div>
                                      <div>
                                        <span className="font-medium">Email:</span> {lead.email || "Not provided"}
                                      </div>
                                      <div>
                                        <span className="font-medium">Location:</span> {lead.location || "Not specified"}
                                      </div>
                                      <div>
                                        <span className="font-medium">Primary hair concern:</span> {lead.area || "Not specified"}
                                      </div>
                                      <div>
                                        <span className="font-medium">Hair loss duration:</span> {lead.duration || "Not specified"}
                                      </div>
                                      {lead.photoData && (
                                        <div className="pt-2">
                                          <div className="mb-2 font-medium">Hair/scalp photo:</div>
                                          {/* eslint-disable-next-line @next/next/no-img-element */}
                                          <img
                                            src={lead.photoData}
                                            alt={`${lead.name}'s hair or scalp assessment`}
                                            className="max-h-[420px] w-full max-w-sm rounded-lg border border-gray-200 bg-gray-100 object-contain"
                                          />
                                        </div>
                                      )}
                                      {lead.telecrmId && (
                                        <div>
                                          <span className="font-medium">TeleCRM ID:</span> {lead.telecrmId}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-gray-900 mb-2">Campaign Attribution</h4>
                                    <div className="space-y-2 text-gray-700">
                                      <div>
                                        <span className="font-medium">Form:</span> {lead.formSource || "Not specified"}
                                      </div>
                                      <div>
                                        <span className="font-medium">Source:</span> {lead.source || "direct"}
                                      </div>
                                      <div>
                                        <span className="font-medium">Medium:</span> {lead.medium || "Not specified"}
                                      </div>
                                      <div>
                                        <span className="font-medium">Campaign:</span> {lead.campaign || "Not specified"}
                                      </div>
                                      {lead.pageUrl && (
                                        <div className="break-all">
                                          <span className="font-medium">Landing page:</span>{" "}
                                          <a
                                            href={lead.pageUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-blue-600 hover:underline"
                                          >
                                            {lead.pageUrl}
                                          </a>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </Fragment>
                      )
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 text-sm text-gray-600 gap-2">
            <div>
              Showing {filteredLeads.length} of {pageLeads.length} {pageView === "hairscan" ? "Hair Scan" : "Landing Page"} leads
              {searchTerm && ` • Filtered by: "${searchTerm}"`}
              {areaFilter !== "all" && ` • Area: ${areaFilter}`}
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <span>New: {stats.new}</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>Converted: {stats.converted}</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-purple-500 rounded-full" />
                <span>Synced: {stats.synced}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
