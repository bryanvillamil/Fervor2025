import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Label } from '@/components/ui/Label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { MessageSquare } from 'lucide-react';
import { useForm } from '@/hooks/useForm';
import { getActiveUser, getUser } from '@/lib/userLocal';

const TestimonioView = ({ onSubmit, onBack }) => {
  const user = getActiveUser() || getUser();
  const [formData, handleInputChange, reset] = useForm({
    testimonio: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...formData, registroId: user?.id ?? null };
    const success = await onSubmit(payload);
    if (success) {
      reset();
      onBack();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-2xl mx-auto md:mt-8"
    >
      <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-2xl text-primary font-bold flex items-center justify-center gap-3">
            <MessageSquare className="w-8 h-8" />
            Compartir Testimonio
          </CardTitle>
          <CardDescription className="text-gray-700 text-base font-bold">
            Cuéntanos cómo Dios obró en tu vida
          </CardDescription>
          <span className="italic font-bold text-[14px] text-gray-500 text-center mb-6 bg-gray-100 p-2 rounded-md w-full">
            “Vuélvete a tu casa, y cuenta cuán grandes cosas ha hecho Dios
            contigo. Y él se fue publicando por toda la ciudad cuán grandes
            cosas había hecho Jesús con él.” Juan 8:39
          </span>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="testimonio"
                className="text-gray-700 font-bold"
              ></Label>
              <textarea
                id="testimonio"
                name="testimonio"
                value={formData.testimonio}
                onChange={handleInputChange}
                className="w-full min-h-40 p-3 bg-white border border-white/30 rounded-md text-secondary font-bold placeholder:text-secondary/50 resize-y"
                placeholder="Comparte tu testimonio de lo que Dios ha hecho..."
                required
              />
            </div>

            <div className="flex gap-4">
              <Button
                type="button"
                onClick={onBack}
                variant="outline"
                className="flex-1 border-secondary/30 text-secondary hover:bg-secondary/10 py-6 font-bold"
              >
                Volver
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-primary/50 hover:to-secondary/50 text-white font-bold py-6"
              >
                Enviar Testimonio
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TestimonioView;
