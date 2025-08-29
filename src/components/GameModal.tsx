import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Icon from "@/components/ui/icon";

interface Game {
  id: number;
  title: string;
  price: string;
  originalPrice: string | null;
  discount: string | null;
  rating: number;
  genre: string;
  image: string;
  steamKey: boolean;
  description: string;
}

interface GameModalProps {
  game: Game | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (game: Game) => void;
  onBuyNow: (game: Game) => void;
}

const GameModal = ({ game, isOpen, onClose, onAddToCart, onBuyNow }: GameModalProps) => {
  if (!game) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl gradient-text">{game.title}</DialogTitle>
          <DialogDescription className="text-lg">{game.description}</DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div className="relative">
            <img 
              src={game.image} 
              alt={game.title}
              className="w-full h-64 object-cover rounded-lg"
            />
            {game.discount && (
              <Badge className="absolute top-4 left-4 bg-secondary text-secondary-foreground text-lg px-3 py-1">
                {game.discount}
              </Badge>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Icon name="Star" size={16} className="text-yellow-400" fill="currentColor" />
                <span className="font-semibold">Рейтинг: {game.rating}/5</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Tag" size={16} className="text-primary" />
                <span>Жанр: <Badge variant="outline">{game.genre}</Badge></span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Key" size={16} className="text-primary" />
                <span>Steam Key - мгновенная доставка</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={16} className="text-green-500" />
                <span>100% гарантия активации</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <span className="text-3xl font-bold text-primary">{game.price}</span>
                  {game.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through">
                      {game.originalPrice}
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Ключ будет отправлен на email сразу после оплаты
                </p>
                <div className="space-y-2">
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={() => onAddToCart(game)}
                  >
                    <Icon name="ShoppingCart" className="mr-2" size={20} />
                    Добавить в корзину
                  </Button>
                  <Button 
                    variant="secondary" 
                    className="w-full"
                    onClick={() => onBuyNow(game)}
                  >
                    <Icon name="Zap" className="mr-2" size={20} />
                    Купить сейчас
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-semibold mb-2">Системные требования:</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
              <div>
                <strong>Минимальные:</strong>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>Windows 10 64-bit</li>
                  <li>Intel Core i5-2500K / AMD FX-6300</li>
                  <li>8 GB RAM</li>
                  <li>GTX 770 / R9 280X</li>
                </ul>
              </div>
              <div>
                <strong>Рекомендуемые:</strong>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>Windows 11 64-bit</li>
                  <li>Intel Core i7-8700K / AMD Ryzen 5 3600</li>
                  <li>16 GB RAM</li>
                  <li>RTX 3060 / RX 6700 XT</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GameModal;