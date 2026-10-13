import React, { useState, useMemo } from 'react';
import { Ticket } from '../../types';
import { CategoryBadge, PriorityBadge, StatusBadge, TeamBadge } from '../common/Badge';
import { ConfidenceBar } from '../common/ConfidenceBar';
import { useApp } from '../../context/AppContext';
import { 
  ArrowUpDown, 
  ChevronLeft, 
  ChevronRight, 
  Eye, 
  RotateCcw,
  Inbox,
  Filter,
  Layers,
  ArrowRight
} from 'lucide-react';

interface TicketTableProps {
  customTickets?: Ticket[];
  title?: string;
  subtitle?: string;
}

export const TicketTable: React.FC<TicketTableProps> = ({ 
  customTickets,
  title = "Support Tickets Directory",
  subtitle = "All tickets analyzed by the Java RuleEngine & Python NLP Classifier"
}) => {
  const { 
    tickets: allTickets, 
    selectTicket, 
    searchQuery, 
    setSearchQuery,
    categoryFilter, 
    setCategoryFilter,
    priorityFilter, 
    setPriorityFilter,
    statusFilter, 
    setStatusFilter,
    teamFilter, 
    setTeamFilter
  } = useApp();

  const sourceTickets = customTickets || allTickets;

  // Sorting
  const [sortField, setSortField] = useState<keyof Ticket>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 8;

  const handleSort = (field: keyof Ticket) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  // Filtered & Sorted tickets
  const filteredTickets = useMemo(() => {
    return sourceTickets.filter(ticket => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesSubject = ticket.subject.toLowerCase().includes(q);
        const matchesDesc = ticket.description.toLowerCase().includes(q);
        const matchesCustomer = ticket.customerName.toLowerCase().includes(q);
        const matchesId = ticket.ticketId.toLowerCase().includes(q);
        const matchesKeyword = ticket.detectedKeywords.some(k => k.toLowerCase().includes(q));
        if (!matchesSubject && !matchesDesc && !matchesCustomer && !matchesId && !matchesKeyword) {
          return false;
        }
      }

      // Category filter
      if (categoryFilter !== 'ALL' && ticket.category !== categoryFilter) return false;

      // Priority filter
      if (priorityFilter !== 'ALL' && ticket.priority !== priorityFilter) return false;

      // Status filter
      if (statusFilter !== 'ALL' && ticket.status !== statusFilter) return false;

      // Team filter
      if (teamFilter !== 'ALL' && ticket.assignedTeam !== teamFilter) return false;

      return true;
    }).sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];

      if (sortField === 'createdAt') {
        const aTime = new Date(a.createdAt).getTime();
        const bTime = new Date(b.createdAt).getTime();
        return sortDirection === 'asc' ? aTime - bTime : bTime - aTime;
      }

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortDirection === 'asc' 
          ? aVal.localeCompare(bVal) 
          : bVal.localeCompare(aVal);
      }

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }

      return 0;
    });
  }, [sourceTickets, searchQuery, categoryFilter, priorityFilter, statusFilter, teamFilter, sortField, sortDirection]);

  // Paginated slice
  const totalPages = Math.ceil(filteredTickets.length / pageSize) || 1;
  const paginatedTickets = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredTickets.slice(start, start + pageSize);
  }, [filteredTickets, currentPage, pageSize]);

  const resetFilters = () => {
    setSearchQuery('');
    setCategoryFilter('ALL');
    setPriorityFilter('ALL');
    setStatusFilter('ALL');
    setTeamFilter('ALL');
    setCurrentPage(1);
  };

  const hasActiveFilters = searchQuery || categoryFilter !== 'ALL' || priorityFilter !== 'ALL' || statusFilter !== 'ALL' || teamFilter !== 'ALL';

  return (
    <div className="glass-card p-0 overflow-hidden mb-8 shadow-2xl">
      {/* Header & Filter Controls */}
      <div className="p-5 sm:p-6 border-b border-white/[0.1] space-y-4 bg-white/[0.02] backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-white/[0.2] text-indigo-300 flex items-center justify-center font-mono font-bold text-sm shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white font-display">
                {title}
              </h2>
              <p className="text-xs text-slate-400 font-sans">
                {subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 text-xs font-mono">
            <span className="px-3 py-1 rounded-full bg-white/[0.06] text-slate-300 border border-white/[0.15] text-[11px] backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
              Showing {filteredTickets.length} of {sourceTickets.length} tickets
            </span>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="px-3 py-1 rounded-full bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
          {/* Category Filter */}
          <div>
            <label className="text-[10px] font-mono font-medium text-slate-400 uppercase tracking-wider block mb-1">
              Category
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => { setCategoryFilter(e.target.value); setCurrentPage(1); }}
              className="w-full glass-input px-3 py-1.5 text-xs font-medium text-slate-200 cursor-pointer"
            >
              <option value="ALL" className="bg-[#0b1021] text-slate-200">All Categories</option>
              <option value="BILLING" className="bg-[#0b1021] text-emerald-400">Billing Support</option>
              <option value="TECHNICAL" className="bg-[#0b1021] text-cyan-400">Technical Support</option>
              <option value="OTHER" className="bg-[#0b1021] text-indigo-400">General Support</option>
            </select>
          </div>

          {/* Priority Filter */}
          <div>
            <label className="text-[10px] font-mono font-medium text-slate-400 uppercase tracking-wider block mb-1">
              Priority
            </label>
            <select
              value={priorityFilter}
              onChange={(e) => { setPriorityFilter(e.target.value); setCurrentPage(1); }}
              className="w-full glass-input px-3 py-1.5 text-xs font-medium text-slate-200 cursor-pointer"
            >
              <option value="ALL" className="bg-[#0b1021] text-slate-200">All Priorities</option>
              <option value="CRITICAL" className="bg-[#0b1021] text-rose-400">Critical (&lt; 15 min)</option>
              <option value="HIGH" className="bg-[#0b1021] text-amber-400">High (&lt; 1 hr)</option>
              <option value="MEDIUM" className="bg-[#0b1021] text-indigo-400">Medium (&lt; 4 hr)</option>
              <option value="LOW" className="bg-[#0b1021] text-slate-400">Low (&lt; 24 hr)</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="text-[10px] font-mono font-medium text-slate-400 uppercase tracking-wider block mb-1">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
              className="w-full glass-input px-3 py-1.5 text-xs font-medium text-slate-200 cursor-pointer"
            >
              <option value="ALL" className="bg-[#0b1021] text-slate-200">All Statuses</option>
              <option value="NEW" className="bg-[#0b1021] text-blue-400">New</option>
              <option value="ROUTED" className="bg-[#0b1021] text-teal-400">Routed</option>
              <option value="IN_PROGRESS" className="bg-[#0b1021] text-indigo-400">In Progress</option>
              <option value="WAITING_FOR_CUSTOMER" className="bg-[#0b1021] text-amber-400">Waiting</option>
              <option value="RESOLVED" className="bg-[#0b1021] text-emerald-400">Resolved</option>
              <option value="MANUAL_REVIEW" className="bg-[#0b1021] text-rose-400">Manual Review</option>
            </select>
          </div>

          {/* Team Filter */}
          <div>
            <label className="text-[10px] font-mono font-medium text-slate-400 uppercase tracking-wider block mb-1">
              Assigned Team
            </label>
            <select
              value={teamFilter}
              onChange={(e) => { setTeamFilter(e.target.value); setCurrentPage(1); }}
              className="w-full glass-input px-3 py-1.5 text-xs font-medium text-slate-200 cursor-pointer"
            >
              <option value="ALL" className="bg-[#0b1021] text-slate-200">All Teams</option>
              <option value="Billing Support" className="bg-[#0b1021] text-emerald-400">Billing Support</option>
              <option value="Technical Support" className="bg-[#0b1021] text-cyan-400">Technical Support</option>
              <option value="General Support" className="bg-[#0b1021] text-indigo-400">General Support</option>
              <option value="Manual Review Team" className="bg-[#0b1021] text-rose-400">Manual Review Team</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-white/[0.08] bg-white/[0.02] text-[11px] font-mono font-medium text-slate-400 uppercase tracking-wider">
              <th className="py-3 px-4 cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('ticketId')}>
                <div className="flex items-center gap-1.5">
                  ID <ArrowUpDown className="w-3 h-3 opacity-60" />
                </div>
              </th>
              <th className="py-3 px-4 cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('customerName')}>
                <div className="flex items-center gap-1.5">
                  Customer <ArrowUpDown className="w-3 h-3 opacity-60" />
                </div>
              </th>
              <th className="py-3 px-4">Subject & Keywords</th>
              <th className="py-3 px-4 cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('category')}>
                <div className="flex items-center gap-1.5">
                  Category <ArrowUpDown className="w-3 h-3 opacity-60" />
                </div>
              </th>
              <th className="py-3 px-4 cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('priority')}>
                <div className="flex items-center gap-1.5">
                  Priority <ArrowUpDown className="w-3 h-3 opacity-60" />
                </div>
              </th>
              <th className="py-3 px-4 cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('confidence')}>
                <div className="flex items-center gap-1.5">
                  Confidence <ArrowUpDown className="w-3 h-3 opacity-60" />
                </div>
              </th>
              <th className="py-3 px-4 cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('assignedTeam')}>
                <div className="flex items-center gap-1.5">
                  Team <ArrowUpDown className="w-3 h-3 opacity-60" />
                </div>
              </th>
              <th className="py-3 px-4 cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('status')}>
                <div className="flex items-center gap-1.5">
                  Status <ArrowUpDown className="w-3 h-3 opacity-60" />
                </div>
              </th>
              <th className="py-3 px-4 text-right">Inspect</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {paginatedTickets.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-12 text-center">
                  <div className="flex flex-col items-center justify-center gap-2 font-sans">
                    <Inbox className="w-8 h-8 text-slate-500" />
                    <p className="text-sm font-medium text-slate-300">No tickets match the selected filters.</p>
                    <button
                      onClick={resetFilters}
                      className="text-xs font-medium text-indigo-400 hover:text-indigo-300 underline cursor-pointer"
                    >
                      Clear all filters
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedTickets.map((ticket) => (
                <tr
                  key={ticket.ticketId}
                  onClick={() => selectTicket(ticket.ticketId)}
                  className="hover:bg-white/[0.08] backdrop-blur-md transition-colors cursor-pointer group"
                >
                  {/* Ticket ID */}
                  <td className="py-3.5 px-4 font-mono font-medium text-xs text-indigo-300 group-hover:text-indigo-200">
                    #{ticket.ticketId}
                  </td>

                  {/* Customer */}
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-xs text-white">{ticket.customerName}</div>
                    <div className="text-[10px] font-mono text-slate-400 truncate max-w-[130px]">{ticket.email}</div>
                  </td>

                  {/* Subject & Keywords */}
                  <td className="py-3.5 px-4 max-w-xs">
                    <div className="font-medium text-xs text-slate-200 truncate group-hover:text-white transition-colors">
                      {ticket.subject}
                    </div>
                    {ticket.detectedKeywords.length > 0 && (
                      <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                        {ticket.detectedKeywords.slice(0, 3).map((kw, i) => (
                          <span key={i} className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-md bg-white/[0.06] backdrop-blur-sm border border-white/[0.14] text-slate-200 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
                            {kw}
                          </span>
                        ))}
                        {ticket.detectedKeywords.length > 3 && (
                          <span className="text-[10px] font-mono text-slate-400">+{ticket.detectedKeywords.length - 3}</span>
                        )}
                      </div>
                    )}
                  </td>

                  {/* Category */}
                  <td className="py-3.5 px-4">
                    <CategoryBadge category={ticket.category} size="sm" />
                  </td>

                  {/* Priority */}
                  <td className="py-3.5 px-4">
                    <PriorityBadge priority={ticket.priority} size="sm" />
                  </td>

                  {/* Confidence Bar */}
                  <td className="py-3.5 px-4 min-w-[120px]">
                    <ConfidenceBar confidence={ticket.confidence || 0.85} size="sm" />
                  </td>

                  {/* Assigned Team */}
                  <td className="py-3.5 px-4">
                    <TeamBadge team={ticket.assignedTeam} />
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4">
                    <StatusBadge status={ticket.status} size="sm" />
                  </td>

                  {/* Action */}
                  <td className="py-3.5 px-4 text-right">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        selectTicket(ticket.ticketId);
                      }}
                      className="p-1.5 rounded-xl bg-white/[0.06] hover:bg-indigo-500/25 border border-white/[0.15] text-slate-300 hover:text-indigo-200 transition-all inline-flex items-center justify-center cursor-pointer shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"
                      title="View Details"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div className="p-4 border-t border-white/[0.1] bg-white/[0.02] backdrop-blur-md flex items-center justify-between text-xs font-mono">
          <div className="text-slate-400">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="btn-secondary px-3 py-1 text-xs flex items-center gap-1 cursor-pointer disabled:opacity-30"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Prev</span>
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="btn-secondary px-3 py-1 text-xs flex items-center gap-1 cursor-pointer disabled:opacity-30"
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
