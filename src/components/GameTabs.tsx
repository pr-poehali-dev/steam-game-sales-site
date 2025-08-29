import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";
import GameCard from "./GameCard";

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

interface GameTabsProps {
  games: Game[];
  onGameClick: (game: Game) => void;
  onAddToCart: (game: Game) => void;
}

const GameTabs = ({ games, onGameClick, onAddToCart }: GameTabsProps) => {
  const newGames = games.slice(0, 3);
  const salesGames = games.filter(game => game.discount);

  return (
    <section className="py-16 bg-card/30">
      <div className="container mx-auto px-4">
        <Tabs defaultValue="new" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-12">
            <TabsTrigger value="new" id="new">
              <Icon name="Sparkles" className="mr-2" size={16} />
              Новинки
            </TabsTrigger>
            <TabsTrigger value="sales" id="sales">
              <Icon name="Percent" className="mr-2" size={16} />
              Скидки
            </TabsTrigger>
            <TabsTrigger value="top">
              <Icon name="TrendingUp" className="mr-2" size={16} />
              Топ
            </TabsTrigger>
          </TabsList>

          <TabsContent value="new" className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">🆕 Новые поступления</h3>
              <p className="text-muted-foreground mb-8">Самые свежие игры в нашем каталоге</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {newGames.map((game) => (
                <GameCard
                  key={`new-${game.id}`}
                  game={game}
                  onGameClick={onGameClick}
                  onAddToCart={onAddToCart}
                  variant="compact"
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="sales" className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">🔥 Горячие скидки</h3>
              <p className="text-muted-foreground mb-8">Лучшие цены только сейчас</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {salesGames.map((game) => (
                <GameCard
                  key={`sale-${game.id}`}
                  game={game}
                  onGameClick={onGameClick}
                  onAddToCart={onAddToCart}
                  variant="compact"
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="top" className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">⭐ Топ продаж</h3>
              <p className="text-muted-foreground mb-8">Самые популярные игры месяца</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {games.map((game, index) => (
                <GameCard
                  key={`top-${game.id}`}
                  game={{...game, discount: `#${index + 1}`}}
                  onGameClick={onGameClick}
                  onAddToCart={onAddToCart}
                  variant="compact"
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default GameTabs;