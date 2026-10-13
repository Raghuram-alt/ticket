import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Customer } from '../types';
import { 
  Users, 
  Building2, 
  Mail, 
  History, 
  Ticket as TicketIcon, 
  CreditCard, 
  Wrench, 
  ChevronRight,
  Search,
  X,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

export const CustomersPage: React.FC = () => {
  const { customers, tickets, selectTicket } = useApp();
  const [search, setSearch] = useState<string>('');
  const [activeCustomer, setActiveCustomer] = useState<Customer | null>(null);

  const filteredCustomers = customers.filter(c => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || c.company.toLowerCase().includes(q);
  });

  const getCustomerTickets = (customerId: string) => {
    return tickets.filter(t => t.customerId === customerId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono font-medium mb-2">
            <Users className="w-3.5 h-3.5 text-indigo-400" />
            <span>ACCOUNT PROFILES &amp; SUPPORT AFFINITY</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display">
            Customer Directory
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-sans mt-1">
            Accounts and historical support affinity utilized by the Java RuleEngine for classification context.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search customer, email, account..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full glass-input pl-10 pr-4 py-2 text-xs font-medium text-slate-100 placeholder:text-slate-500"
          />
        </div>
      </div>

      {/* Customer Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.map((cust) => {
          const custTickets = getCustomerTickets(cust.customerId);
          const lastTicket = custTickets[0];

          return (
            <div
              key={cust.customerId}
              onClick={() => setActiveCustomer(cust)}
              className="glass-card p-6 border border-white/[0.08] shadow-2xl hover:border-indigo-500/30 transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <span className="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                      {cust.tier} Tier
                    </span>
                    <h3 className="text-base font-bold text-white font-display mt-2 group-hover:text-indigo-300 transition-colors">
                      {cust.name}
                    </h3>
                    <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5 font-sans">
                      <Building2 className="w-3.5 h-3.5 text-indigo-400" />
                      {cust.company}
                    </p>
                  </div>
                  <span className="p-1.5 rounded-lg bg-white/[0.04] text-slate-400 group-hover:text-white group-hover:bg-white/[0.08] transition-all">
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </div>

                <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5 mb-4">
                  <Mail className="w-3.5 h-3.5 text-slate-500" />
                  {cust.email}
                </div>

                {/* Statistics Pills */}
                <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/[0.06] text-center font-mono">
                  <div className="p-2 rounded-lg bg-white/[0.02]">
                    <span className="text-[10px] uppercase text-slate-500 block font-medium">Total</span>
                    <span className="text-sm font-bold text-slate-200">{cust.history.totalTickets}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <span className="text-[10px] uppercase text-emerald-400 block font-medium">Billing</span>
                    <span className="text-sm font-bold text-emerald-300">{cust.history.billingTickets}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                    <span className="text-[10px] uppercase text-cyan-400 block font-medium">Tech</span>
                    <span className="text-sm font-bold text-cyan-300">{cust.history.technicalTickets}</span>
                  </div>
                </div>
              </div>

              {/* Latest ticket footer */}
              <div className="pt-3 mt-3 text-xs font-mono flex items-center justify-between text-slate-400">
                <span className="text-[10px] uppercase text-slate-500">Last Ticket:</span>
                <span className="text-slate-200 font-medium truncate max-w-[150px]">
                  {lastTicket ? lastTicket.subject : 'No tickets'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Customer Ticket History Drawer / Modal */}
      {activeCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fade-in">
          <div className="w-full max-w-2xl glass-panel p-0 shadow-2xl overflow-hidden flex flex-col max-h-[85vh] border border-white/20">
            <div className="p-5 border-b border-white/[0.1] flex items-center justify-between bg-white/[0.03]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 flex items-center justify-center font-mono font-bold text-sm shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">
                  {activeCustomer.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-display">{activeCustomer.name}</h3>
                  <p className="text-xs text-slate-300">{activeCustomer.company} &bull; {activeCustomer.email}</p>
                </div>
              </div>
              <button
                onClick={() => setActiveCustomer(null)}
                className="p-1.5 rounded-xl bg-white/[0.06] text-slate-400 hover:text-white hover:bg-white/[0.12] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5 text-indigo-400 font-semibold uppercase">
                  <History className="w-4 h-4" />
                  Support History &amp; Audit Trail
                </span>
                <span>
                  {getCustomerTickets(activeCustomer.customerId).length} Recorded Tickets
                </span>
              </div>

              <div className="divide-y divide-white/[0.04] rounded-xl border border-white/[0.06] overflow-hidden">
                {getCustomerTickets(activeCustomer.customerId).length === 0 ? (
                  <div className="p-6 text-center text-xs font-mono text-slate-500">
                    No tickets registered for this customer yet.
                  </div>
                ) : (
                  getCustomerTickets(activeCustomer.customerId).map((t) => (
                    <div
                      key={t.ticketId}
                      onClick={() => {
                        setActiveCustomer(null);
                        selectTicket(t.ticketId);
                      }}
                      className="p-4 hover:bg-white/[0.04] transition-colors cursor-pointer flex items-center justify-between gap-3 group"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-medium text-indigo-400">
                            #{t.ticketId}
                          </span>
                          <span className="text-xs font-medium text-white group-hover:text-indigo-300 transition-colors">
                            {t.subject}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                          {t.description}
                        </div>
                      </div>

                      <div className="text-right shrink-0 font-mono">
                        <span className="text-xs text-slate-300 font-semibold block">{t.assignedTeam}</span>
                        <span className="text-[10px] text-emerald-400 font-medium">{Math.round(t.confidence * 100)}% conf</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
