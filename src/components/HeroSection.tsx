import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import Icon from "@/components/ui/icon";

interface HeroSectionProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedGenre: string;
  setSelectedGenre: (genre: string) => void;
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
}

const HeroSection = ({
  searchTerm,
  setSearchTerm,
  selectedGenre,
  setSelectedGenre,
  priceRange,
  setPriceRange
}: HeroSectionProps) => {
  return (
    <section className="relative py-20 bg-gradient-to-br from-primary/20 via-background to-secondary/20">
      <div className="absolute inset-0 bg-[url('/img/fe4620e2-0079-4346-ba8f-5b6c9a551aec.jpg')] bg-cover bg-center opacity-10" />
      <div className="container mx-auto px-4 text-center relative">
        <h2 className="text-5xl font-bold mb-6 gradient-text animate-fade-in">
          🎮 Лучшие Steam-игры
        </h2>
        <p className="text-xl text-muted-foreground mb-8 animate-fade-in">
          Мгновенная выдача ключей • Гарантия подлинности • Поддержка 24/7
        </p>
        <div className="max-w-2xl mx-auto mb-8 space-y-4">
          <div className="relative">
            <Icon name="Search" className="absolute left-3 top-3 text-muted-foreground" size={20} />
            <Input
              placeholder="Найти игру..."
              className="pl-10 py-3 text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="flex items-center space-x-2">
              <Icon name="Filter" size={16} />
              <span className="text-sm">Фильтры:</span>
            </div>
            <Select value={selectedGenre} onValueChange={setSelectedGenre}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Жанр" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все жанры</SelectItem>
                <SelectItem value="RPG">RPG</SelectItem>
                <SelectItem value="Racing">Racing</SelectItem>
                <SelectItem value="Shooter">Shooter</SelectItem>
                <SelectItem value="Action">Action</SelectItem>
                <SelectItem value="Strategy">Strategy</SelectItem>
                <SelectItem value="Adventure">Adventure</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="flex items-center space-x-2 bg-card/50 px-3 py-2 rounded-lg border">
              <span className="text-sm whitespace-nowrap">Цена:</span>
              <span className="text-xs text-muted-foreground">₽{priceRange[0]}</span>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={2000}
                step={100}
                className="w-24"
              />
              <span className="text-xs text-muted-foreground">₽{priceRange[1]}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <Badge variant="secondary" className="px-4 py-2 text-lg">
            <Icon name="Zap" className="mr-2" size={16} />
            Автовыдача ключей
          </Badge>
          <Badge variant="secondary" className="px-4 py-2 text-lg">
            <Icon name="Shield" className="mr-2" size={16} />
            Гарантия Steam
          </Badge>
          <Badge variant="secondary" className="px-4 py-2 text-lg">
            <Icon name="Clock" className="mr-2" size={16} />
            24/7 Поддержка
          </Badge>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;