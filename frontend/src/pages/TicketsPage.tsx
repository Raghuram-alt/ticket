import React from 'react';
import { TicketTable } from '../components/tickets/TicketTable';
import { useApp } from '../context/AppContext';
import { PlusCircle, Sparkles } from 'lucide-react';

export const TicketsPage: React.FC = () => {
  const { setActivePage, createRandomDemoTicket } = useApp();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Support Tickets</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Browse, filter, search, and inspect tickets processed by the AI Routing Agent.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setActivePage('create-ticket')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create Ticket</span>
          </button>
          <button
            onClick={createRandomDemoTicket}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Simulate Ticket</span>
          </button>
        </div>
      </div>

      <TicketTable />
    </div>
  );
};
