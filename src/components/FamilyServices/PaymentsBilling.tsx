import React, { useState } from 'react';
import { CreditCard, Smartphone, Download, CheckCircle2, AlertCircle, FileText, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PaymentsBilling: React.FC = () => {
  const { invoices, payInvoice, isTeenMode, showToast } = useApp();
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'Bizum' | 'Targeta'>('Bizum');
  const [bizumPhone, setBizumPhone] = useState('612 345 678');

  const pendingInvoices = invoices.filter((i) => i.status === 'pending');
  const paidInvoices = invoices.filter((i) => i.status === 'paid');

  const handlePay = (invoiceId: string) => {
    payInvoice(invoiceId, paymentMethod);
    setSelectedInvoiceId(null);
  };

  const handleDownloadReceipt = (inv: typeof invoices[0]) => {
    // Generate clean text receipt
    const receiptContent = `=========================================
HYDE PARK SCHOOL - REBUT OFICIAL DE PAGAMENT
Torras i Bages, 41 - NIF: B-65432198
Tel: 93 876 54 32 - info@hydeparkschool.cat
=========================================
Concepte: ${inv.concept}
Termini: ${inv.term}
Import abonat: ${inv.amount.toFixed(2)} €
Estat: PAGAT
Data i forma de pagament: ${inv.paidDate || 'Pagat via passarel·la segura'}
Titular: Marc Rovira Soler
Tutor: Montserrat Soler (DNI: 47892341K)
=========================================
Aquest document és vàlid com a justificant fiscal.
Gràcies per confiar en Hyde Park School.
=========================================`;

    const blob = new Blob([receiptContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `rebut_hyde_park_${inv.id}.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast(`📄 Rebut oficial descarregat: ${inv.concept}`);
  };

  return (
    <div
      className={`p-6 sm:p-7 rounded-3xl border ${
        isTeenMode ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-slate-200'
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-indigo-500" />
            <h3 className="text-xl font-bold tracking-tight">Pagaments & Rebuts Descarregables</h3>
          </div>
          <p className="text-xs text-neutral-500 mt-1">
            Quotes trimestrals, matrícules i llibres. Paga amb targeta o Bizum amb rebut oficial descarregable a l'instant.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 font-bold border border-emerald-500/20">
            {pendingInvoices.length === 0 ? 'Tot al dia' : `${pendingInvoices.length} rebuts pendents`}
          </span>
        </div>
      </div>

      {/* Pending Invoices */}
      {pendingInvoices.length > 0 && (
        <div className="mb-6 space-y-3">
          <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider block">
            Quotes pendents de pagament:
          </span>

          {pendingInvoices.map((inv) => (
            <div
              key={inv.id}
              className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/30 flex flex-wrap items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase font-bold text-amber-600 bg-amber-500/10 px-2 py-0.5 rounded">
                  {inv.term}
                </span>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">{inv.concept}</h4>
                <p className="text-xs text-neutral-500">Data límit: {inv.dueDate}</p>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-xl font-black font-mono text-slate-900 dark:text-white">
                  {inv.amount.toFixed(2)} €
                </span>

                <button
                  onClick={() => setSelectedInvoiceId(inv.id)}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-md shadow-indigo-950 cursor-pointer"
                >
                  Pagar Ara
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Payment Modal/Drawer if opened */}
      {selectedInvoiceId && (
        <div className="mb-6 p-6 rounded-2xl bg-indigo-50 dark:bg-neutral-800 border-2 border-indigo-400 space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              Tria mètode de pagament segur:
            </h4>
            <button
              onClick={() => setSelectedInvoiceId(null)}
              className="text-xs text-neutral-500 hover:text-black dark:hover:text-white cursor-pointer"
            >
              Cancel·lar
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setPaymentMethod('Bizum')}
              className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold cursor-pointer ${
                paymentMethod === 'Bizum'
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>Bizum immediat</span>
            </button>

            <button
              onClick={() => setPaymentMethod('Targeta')}
              className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold cursor-pointer ${
                paymentMethod === 'Targeta'
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>Targeta Bancària</span>
            </button>
          </div>

          {paymentMethod === 'Bizum' ? (
            <div className="p-3 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-700 space-y-2 text-xs">
              <label className="block text-neutral-500 font-semibold">
                Número de telèfon per a la sol·licitud Bizum:
              </label>
              <input
                type="tel"
                value={bizumPhone}
                onChange={(e) => setBizumPhone(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent text-slate-800 dark:text-white font-mono font-bold"
              />
              <p className="text-[11px] text-neutral-400">
                Rebràs una notificació a la teva app bancària per autoritzar el pagament a Hyde Park School.
              </p>
            </div>
          ) : (
            <div className="p-3 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-700 space-y-2 text-xs">
              <span className="block font-semibold">Passarel·la de pagament REDSYS / Stripe</span>
              <p className="text-[11px] text-neutral-400">
                Connexió segura xifrada SSL de 256 bits directa amb la nostra entitat financera.
              </p>
            </div>
          )}

          <button
            onClick={() => handlePay(selectedInvoiceId)}
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-emerald-950 cursor-pointer"
          >
            Confirmar Pagament de 285.00 € amb {paymentMethod}
          </button>
        </div>
      )}

      {/* Paid Invoices History with Downloadable Receipts */}
      <div className="space-y-3">
        <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider block">
          Historial de rebuts abonats:
        </span>

        {paidInvoices.map((inv) => (
          <div
            key={inv.id}
            className={`p-4 rounded-2xl border flex flex-wrap items-center justify-between gap-4 ${
              isTeenMode ? 'bg-neutral-950 border-neutral-800' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <h4 className="font-bold text-xs text-slate-900 dark:text-white">{inv.concept}</h4>
              </div>
              <p className="text-[11px] text-neutral-400">Abonat el {inv.paidDate}</p>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm font-bold font-mono text-slate-900 dark:text-white">
                {inv.amount.toFixed(2)} €
              </span>

              <button
                onClick={() => handleDownloadReceipt(inv)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-neutral-300 dark:border-neutral-700 hover:border-indigo-500 text-xs font-semibold transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-neutral-500" />
                <span>Rebut</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
