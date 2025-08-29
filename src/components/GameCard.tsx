import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

interface GameCardProps {
  game: Game;
  onGameClick: (game: Game) => void;
  onAddToCart: (game: Game) => void;
  variant?: "default" | "compact";
}

const GameCard = ({ game, onGameClick, onAddToCart, variant = "default" }: GameCardProps) => {
  if (variant === "compact") {
    return (
      <Card className="game-card">
        <div className="relative">
          <img 
            src={game.image} 
            alt={game.title}
            className="w-full h-32 object-cover cursor-pointer"
            onClick={() => onGameClick(game)}
          />
          {game.discount && (
            <Badge className="absolute top-2 left-2 bg-secondary animate-glow">
              {game.discount}
            </Badge>
          )}
          <Badge className="absolute top-2 right-2 bg-primary">NEW</Badge>
        </div>
        <CardHeader className="pb-2">
          <CardTitle 
            className="text-base cursor-pointer hover:text-primary" 
            onClick={() => onGameClick(game)}
          >
            {game.title}
          </CardTitle>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-primary">{game.price}</span>
              {game.originalPrice && (
                <span className="text-sm line-through text-muted-foreground">
                  {game.originalPrice}
                </span>
              )}
            </div>
            <Button size="sm" onClick={() => onAddToCart(game)}>
              Купить
            </Button>
          </div>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="game-card group">
      <div className="relative cursor-pointer" onClick={() => onGameClick(game)}>
        <img 
          src={game.image} 
          alt={game.title}
          className="w-full h-48 object-cover"
        />
        {game.discount && (
          <Badge className="absolute top-2 left-2 bg-secondary text-secondary-foreground">
            {game.discount}
          </Badge>
        )}
        <Badge className="absolute top-2 right-2 bg-primary/90">
          <Icon name="Key" className="mr-1" size={12} />
          Steam Key
        </Badge>
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Icon name="Eye" size={24} className="text-white" />
        </div>
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle 
            className="text-lg cursor-pointer hover:text-primary" 
            onClick={() => onGameClick(game)}
          >
            {game.title}
          </CardTitle>
          <div className="flex items-center space-x-1 text-sm text-yellow-400">
            <Icon name="Star" size={14} fill="currentColor" />
            <span>{game.rating}</span>
          </div>
        </div>
        <CardDescription>{game.description}</CardDescription>
        <Badge variant="outline" className="w-fit">
          {game.genre}
        </Badge>
      </CardHeader>
      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-primary">{game.price}</span>
          {game.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {game.originalPrice}
            </span>
          )}
        </div>
        <Button className="hover-scale" onClick={() => onAddToCart(game)}>
          <Icon name="ShoppingCart" className="mr-2" size={16} />
          Купить
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GameCard;