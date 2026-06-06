import React, { useState } from 'react';
import { useData, Inquiry } from '../../context/DataContext';
import { Mail, MailOpen, Trash2, Calendar, User, Info, Reply, CheckSquare } from 'lucide-react';

export default function Inbox() {
  const { data, markInquiryRead, deleteInquiry, clearAllInquiries } = useData();
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  const inquiries = data.inquiries;

  const handleSelect = (inq: Inquiry) => {
    setSelectedInquiry(inq);
    if (!inq.isRead) {
      markInquiryRead(inq.id, true);
    }
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this message?')) {
      deleteInquiry(id);
      if (selectedInquiry?.id === id) {
        setSelectedInquiry(null);
      }
    }
  };

  const handleClearAll = () => {
    if (window.confirm('WARNING: Are you sure you want to delete ALL messages in your inbox? This action cannot be undone.')) {
      clearAllInquiries();
      setSelectedInquiry(null);
    }
  };

  const handleMarkAllRead = () => {
    inquiries.forEach((inq) => {
      if (!inq.isRead) {
        markInquiryRead(inq.id, true);
      }
    });
  };

  const formatDate = (isoString: string) => {
    const d = new Date(isoString);
    return d.toLocaleDateString(undefined, {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-dark font-heading">
            Inquiries Inbox
          </h2>
          <p className="text-sm text-dark/60">
            Read and reply to inquiries sent by users through the contact form.
          </p>
        </div>
        {inquiries.length > 0 && (
          <div className="flex gap-2">
            <button
              onClick={handleMarkAllRead}
              className="px-3.5 py-2 border border-dark/15 text-dark/80 hover:border-accent hover:text-accent font-semibold rounded-xl text-xs flex items-center gap-1.5 transition-all bg-white shadow-sm"
            >
              <CheckSquare size={14} /> Mark All Read
            </button>
            <button
              onClick={handleClearAll}
              className="px-3.5 py-2 bg-red-50 text-red-600 hover:bg-red-100 font-semibold rounded-xl text-xs flex items-center gap-1.5 transition-all border border-red-100"
            >
              <Trash2 size={14} /> Clear Inbox
            </button>
          </div>
        )}
      </div>

      {inquiries.length === 0 ? (
        <div className="bg-white rounded-3xl border border-dark/5 shadow-sm p-16 text-center">
          <Mail className="mx-auto text-dark/20 mb-4 animate-bounce" size={48} />
          <h3 className="text-lg font-bold text-dark font-heading">Your inbox is empty</h3>
          <p className="text-sm text-dark/50 mt-1 max-w-sm mx-auto">
            When visitors fill out the contact form on the website, their inquiries will show up here.
          </p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-5 gap-6 items-start">
          {/* List panel */}
          <div className="lg:col-span-2 space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {inquiries.map((inq) => (
              <div
                key={inq.id}
                onClick={() => handleSelect(inq)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer text-left relative group ${
                  selectedInquiry?.id === inq.id
                    ? 'bg-accent/10 border-accent shadow-sm shadow-accent/5'
                    : inq.isRead
                    ? 'bg-white border-dark/5 hover:border-dark/20'
                    : 'bg-white border-l-4 border-l-accent border-y-dark/5 border-r-dark/5 font-semibold hover:border-dark/20'
                }`}
              >
                <div className="flex justify-between items-start gap-2 pr-6">
                  <span className="text-sm text-dark truncate font-bold">{inq.name}</span>
                  <span className="text-[10px] text-dark/40 font-semibold flex-shrink-0 mt-0.5">
                    {new Date(inq.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </span>
                </div>
                <div className="text-xs text-dark/50 truncate font-semibold mt-0.5">{inq.subject}</div>
                <p className="text-xs text-dark/70 line-clamp-2 mt-2 font-normal">
                  {inq.message}
                </p>

                {/* Mark as read toggle */}
                <div className="absolute right-4 bottom-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      markInquiryRead(inq.id, !inq.isRead);
                    }}
                    className="p-1.5 hover:bg-dark/5 text-dark/40 hover:text-dark rounded-md transition-colors"
                    title={inq.isRead ? 'Mark as Unread' : 'Mark as Read'}
                  >
                    {inq.isRead ? <Mail size={14} /> : <MailOpen size={14} />}
                  </button>
                  <button
                    onClick={(e) => handleDelete(inq.id, e)}
                    className="p-1.5 hover:bg-red-50 text-dark/40 hover:text-red-600 rounded-md transition-colors"
                    title="Delete Message"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Reading panel */}
          <div className="lg:col-span-3 bg-white rounded-3xl border border-dark/5 shadow-sm p-6 sm:p-8 min-h-[400px] flex flex-col justify-between">
            {selectedInquiry ? (
              <div className="space-y-6 flex-grow">
                {/* Header */}
                <div className="border-b border-dark/5 pb-5 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <User size={16} className="text-dark/40" />
                      <span className="text-base font-bold text-dark font-heading">{selectedInquiry.name}</span>
                    </div>
                    <div className="text-sm font-semibold text-accent">{selectedInquiry.email}</div>
                  </div>
                  <div className="text-xs text-dark/40 font-semibold flex items-center gap-1.5">
                    <Calendar size={13} />
                    {formatDate(selectedInquiry.date)}
                  </div>
                </div>

                {/* Message Details */}
                <div className="space-y-4 flex-grow">
                  <div>
                    <span className="text-xs text-dark/40 font-bold uppercase tracking-wider block mb-1">
                      Subject
                    </span>
                    <h3 className="text-lg font-bold text-dark font-heading">
                      {selectedInquiry.subject}
                    </h3>
                  </div>

                  <div className="bg-cream/20 p-5 rounded-2xl border border-dark/5">
                    <span className="text-xs text-dark/40 font-bold uppercase tracking-wider block mb-2">
                      Message Content
                    </span>
                    <p className="text-dark/80 leading-relaxed text-sm whitespace-pre-wrap font-normal">
                      {selectedInquiry.message}
                    </p>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-2 pt-4 border-t border-dark/5">
                  <a
                    href={`mailto:${selectedInquiry.email}?subject=Re: ${selectedInquiry.subject}`}
                    className="px-5 py-3 bg-accent hover:bg-accent-dark text-cream font-semibold rounded-xl text-sm flex items-center justify-center gap-2 transition-all flex-1 shadow-md shadow-accent/10"
                  >
                    <Reply size={16} /> Reply via Email
                  </a>
                  <button
                    onClick={(e) => handleDelete(selectedInquiry.id, e)}
                    className="px-5 py-3 bg-red-50 text-red-600 hover:bg-red-100 font-semibold rounded-xl text-sm flex items-center justify-center gap-2 transition-all border border-red-100"
                  >
                    <Trash2 size={16} /> Delete Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex-grow flex flex-col justify-center items-center text-center p-8">
                <Info size={40} className="text-dark/20 mb-3" />
                <h3 className="text-base font-bold text-dark font-heading">No message selected</h3>
                <p className="text-xs text-dark/40 mt-1 max-w-xs">
                  Click on an inquiry from the list on the left to read its details.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
