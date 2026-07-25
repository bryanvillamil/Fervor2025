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
      className="mx-auto max-w-2xl"
    >
      <Card className="fervor-panel overflow-hidden rounded-3xl">
        <CardHeader className="border-b border-secondary/10 bg-gradient-to-br from-primary to-celestial px-6 py-8 text-center">
          <CardTitle className="flex items-center justify-center gap-3 font-bebasNeue text-3xl tracking-wide text-white">
            <MessageSquare className="h-8 w-8 text-terceary" />
            Compartir Testimonio
          </CardTitle>
          <CardDescription className="font-montserratMedium text-sm text-white/65">
            Cuéntanos cómo Dios obró en tu vida
          </CardDescription>
          <span className="mt-4 w-full rounded-xl border border-white/10 bg-white/10 p-3 text-center text-xs font-medium italic leading-relaxed text-white/70">
            “Vuélvete a tu casa, y cuenta cuán grandes cosas ha hecho Dios
            contigo. Y él se fue publicando por toda la ciudad cuán grandes
            cosas había hecho Jesús con él.” Juan 8:39
          </span>
        </CardHeader>
        <CardContent className="p-6 sm:p-10">
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
