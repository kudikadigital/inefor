"use client";

import React, { useState } from "react";
import { X, CheckCircle, ArrowRight, ArrowLeft, Loader2, CreditCard, User, Mail, Phone, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface EnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseTitle: string;
  courseId: string;
  coursePrice?: string;
}

type Step = 1 | 2 | 3;

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  document: string;
  company?: string;
  notes?: string;
}

export function EnrollmentModal({ isOpen, onClose, courseTitle, courseId, coursePrice }: EnrollmentModalProps) {
  const [step, setStep] = useState<Step>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    document: "",
    company: "",
    notes: "",
  });

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (step === 1) {
      // Validate step 1
      if (!formData.fullName || !formData.email || !formData.phone || !formData.document) {
        return;
      }
      setStep(2);
    } else if (step === 2) {
      // Process payment simulation
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setStep(3);
      }, 2000);
    }
  };

  const handleBack = () => {
    setStep(step - 1 as Step);
  };

  const handleClose = () => {
    setStep(1);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      document: "",
      company: "",
      notes: "",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-2xl bg-card rounded-2xl shadow-2xl border border-border overflow-hidden animate-scale-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border bg-gradient-to-r from-primary/5 to-transparent">
          <div>
            <Badge variant="glass" className="mb-2">
              Inscrição
            </Badge>
            <h2 className="text-xl font-light text-foreground">
              {step === 1 && "Dados Pessoais"}
              {step === 2 && "Pagamento"}
              {step === 3 && "Inscrição Confirmada!"}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {courseTitle}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Steps Progress */}
        {step !== 3 && (
          <div className="px-6 pt-6">
            <div className="flex items-center justify-between">
              {[1, 2].map((s) => (
                <div key={s} className="flex items-center flex-1">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all",
                      step >= s
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {step > s ? <CheckCircle className="w-4 h-4" /> : s}
                  </div>
                  {s === 1 && (
                    <div
                      className={cn(
                        "flex-1 h-0.5 mx-2 transition-all",
                        step > 1 ? "bg-primary" : "bg-muted"
                      )}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-xs text-muted-foreground">Dados</span>
              <span className="text-xs text-muted-foreground">Pagamento</span>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {/* Step 1: Personal Data */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Nome completo *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Digite seu nome completo"
                      className="w-full pl-9 pr-4 py-2 bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="seu@email.com"
                      className="w-full pl-9 pr-4 py-2 bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Telefone *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+244 900 000 000"
                      className="w-full pl-9 pr-4 py-2 bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    BI / Passaporte *
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      name="document"
                      value={formData.document}
                      onChange={handleInputChange}
                      placeholder="Número do documento"
                      className="w-full pl-9 pr-4 py-2 bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Empresa (opcional)
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Nome da empresa"
                    className="w-full px-4 py-2 bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Observações (opcional)
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Alguma observação?"
                    className="w-full px-4 py-2 bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Payment */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="bg-muted/50 rounded-xl p-4 border border-border">
                <h3 className="font-medium text-foreground mb-2">Resumo da inscrição</h3>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Curso:</span>
                  <span className="text-foreground">{courseTitle}</span>
                </div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Valor:</span>
                  <span className="text-primary font-medium">{coursePrice || "Consulte"}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Método de pagamento
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: "mbway", name: "MB WAY", icon: "📱" },
                    { id: "transfer", name: "Transferência", icon: "🏦" },
                    { id: "deposit", name: "Depósito", icon: "💰" },
                    { id: "cash", name: "Numerário", icon: "💵" },
                  ].map((method) => (
                    <label
                      key={method.id}
                      className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:border-primary/50 transition-colors"
                    >
                      <input type="radio" name="paymentMethod" className="text-primary" />
                      <span className="text-lg">{method.icon}</span>
                      <span className="text-sm text-foreground">{method.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="bg-primary/5 rounded-xl p-4 border border-primary/20">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Dados para pagamento:</strong>
                  <br />
                  Conta BAI: 9848701410001
                  <br />
                  IBAN: 0040.0000.9848.7014.1014.9
                  <br />
                  <span className="text-xs">Após o pagamento, anexe o comprovante no próximo passo.</span>
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Comprovante de pagamento
                </label>
                <div className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <input type="file" className="hidden" id="receipt" />
                  <label htmlFor="receipt" className="cursor-pointer">
                    <CreditCard className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Clique para anexar comprovante
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PDF, JPG ou PNG (max 5MB)
                    </p>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Success */}
          {step === 3 && (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-success" />
              </div>
              <h3 className="text-2xl font-light text-foreground mb-2">
                Inscrição Realizada!
              </h3>
              <p className="text-muted-foreground mb-6">
                Sua inscrição foi recebida com sucesso. Em breve entraremos em contato.
              </p>
              <div className="bg-muted/50 rounded-lg p-4 text-left mb-6">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Próximos passos:</strong>
                  <br />
                  1. Aguarde nosso contato para confirmação da vaga
                  <br />
                  2. Você receberá um email com os detalhes do curso
                  <br />
                  3. Prepare-se para iniciar sua jornada de aprendizado!
                </p>
              </div>
              <Button onClick={handleClose} size="lg" className="gap-2">
                Voltar para o site
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {step !== 3 && (
          <div className="flex justify-between gap-3 p-6 border-t border-border bg-muted/20">
            {step === 2 && (
              <Button onClick={handleBack} variant="outline" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Voltar
              </Button>
            )}
            {step === 1 && (
              <Button onClick={handleClose} variant="outline">
                Cancelar
              </Button>
            )}
            <Button onClick={handleNext} disabled={isSubmitting} className="gap-2 ml-auto">
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Processando...
                </>
              ) : (
                <>
                  {step === 1 ? "Continuar" : "Confirmar pagamento"}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes scale-up {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scale-up {
          animation: scale-up 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}