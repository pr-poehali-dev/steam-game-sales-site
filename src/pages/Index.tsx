import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";
import { useState } from "react";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const featuredGames = [
    {
      id: 1,
      title: "Mystic Legends RPG",
      price: "₽1,299",
      originalPrice: "₽1,799",
      discount: "-30%",
      rating: 4.8,
      genre: "RPG",
      image: "/img/716ab0ba-41a0-4811-846f-a427888568cd.jpg",
      steamKey: true,
      description: "Эпическая RPG с открытым миром и захватывающим сюжетом"
    },
    {
      id: 2,
      title: "Speed Racing Championship",
      price: "₽899",
      originalPrice: "₽1,299",
      discount: "-31%",
      rating: 4.5,
      genre: "Racing",
      image: "/img/c0d624fd-0e6d-45e6-ba03-237df1bbcca2.jpg",
      steamKey: true,
      description: "Реалистичные гонки с потрясающей графикой"
    },
    {
      id: 3,
      title: "Cyber Shooter 2077",
      price: "₽1,599",
      originalPrice: null,
      discount: null,
      rating: 4.9,
      genre: "Shooter",
      image: "/img/fe4620e2-0079-4346-ba8f-5b6c9a551aec.jpg",
      steamKey: true,
      description: "Футуристический шутер в киберпанк вселенной"
    }
  ];

  const gameGenres = [
    { name: "Action", icon: "Zap", count: 156 },
    { name: "RPG", icon: "Shield", count: 89 },
    { name: "Racing", icon: "Car", count: 45 },
    { name: "Strategy", icon: "Brain", count: 67 },
    { name: "Shooter", icon: "Target", count: 134 },
    { name: "Adventure", icon: "Map", count: 78 }
  ];

  const reviews = [
    {
      id: 1,
      user: "GameMaster2024",
      rating: 5,
      text: "Быстрая доставка ключей! Отличный сервис!",
      game: "Mystic Legends RPG"
    },
    {
      id: 2,
      user: "SpeedRacer",
      rating: 5,
      text: "Ключ пришел мгновенно после оплаты. Рекомендую!",
      game: "Speed Racing Championship"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <h1 className="text-2xl font-bold gradient-text">SteamKeys Store</h1>
              <nav className="hidden md:flex space-x-6">
                <a href="#catalog" className="hover:text-primary transition-colors">Каталог</a>
                <a href="#new" className="hover:text-primary transition-colors">Новинки</a>
                <a href="#sales" className="hover:text-primary transition-colors">Скидки</a>
                <a href="#genres" className="hover:text-primary transition-colors">Жанры</a>
                <a href="#reviews" className="hover:text-primary transition-colors">Отзывы</a>
                <a href="#support" className="hover:text-primary transition-colors">Поддержка</a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Icon name="ShoppingCart" size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="User" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/20 via-background to-secondary/20">
        <div className="absolute inset-0 bg-[url('/img/fe4620e2-0079-4346-ba8f-5b6c9a551aec.jpg')] bg-cover bg-center opacity-10" />
        <div className="container mx-auto px-4 text-center relative">
          <h2 className="text-5xl font-bold mb-6 gradient-text animate-fade-in">
            🎮 Лучшие Steam-игры
          </h2>
          <p className="text-xl text-muted-foreground mb-8 animate-fade-in">
            Мгновенная выдача ключей • Гарантия подлинности • Поддержка 24/7
          </p>
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Icon name="Search" className="absolute left-3 top-3 text-muted-foreground" size={20} />
              <Input
                placeholder="Найти игру..."
                className="pl-10 py-3 text-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
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

      {/* Featured Games */}
      <section id="catalog" className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">🔥 Популярные игры</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredGames.map((game) => (
              <Card key={game.id} className="game-card group">
                <div className="relative">
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
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{game.title}</CardTitle>
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
                  <Button className="hover-scale">
                    <Icon name="ShoppingCart" className="mr-2" size={16} />
                    Купить
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs Section */}
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
                {featuredGames.slice(0, 3).map((game) => (
                  <Card key={`new-${game.id}`} className="game-card">
                    <div className="relative">
                      <img 
                        src={game.image} 
                        alt={game.title}
                        className="w-full h-32 object-cover"
                      />
                      <Badge className="absolute top-2 right-2 bg-primary">NEW</Badge>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{game.title}</CardTitle>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-primary">{game.price}</span>
                        <Button size="sm">Купить</Button>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="sales" className="space-y-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">🔥 Горячие скидки</h3>
                <p className="text-muted-foreground mb-8">Лучшие цены только сейчас</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredGames.filter(game => game.discount).map((game) => (
                  <Card key={`sale-${game.id}`} className="game-card border-secondary/50">
                    <div className="relative">
                      <img 
                        src={game.image} 
                        alt={game.title}
                        className="w-full h-32 object-cover"
                      />
                      <Badge className="absolute top-2 left-2 bg-secondary animate-glow">
                        {game.discount}
                      </Badge>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{game.title}</CardTitle>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-primary">{game.price}</span>
                          <span className="text-sm line-through text-muted-foreground">
                            {game.originalPrice}
                          </span>
                        </div>
                        <Button size="sm">Купить</Button>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="top" className="space-y-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">⭐ Топ продаж</h3>
                <p className="text-muted-foreground mb-8">Самые популярные игры месяца</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredGames.map((game, index) => (
                  <Card key={`top-${game.id}`} className="game-card">
                    <div className="relative">
                      <img 
                        src={game.image} 
                        alt={game.title}
                        className="w-full h-32 object-cover"
                      />
                      <Badge className="absolute top-2 left-2 bg-primary">
                        #{index + 1}
                      </Badge>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{game.title}</CardTitle>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <Icon name="Star" size={14} className="text-yellow-400" fill="currentColor" />
                          <span className="text-sm">{game.rating}</span>
                        </div>
                        <Button size="sm">Купить</Button>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Genres */}
      <section id="genres" className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">🎯 Игры по жанрам</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {gameGenres.map((genre) => (
              <Card key={genre.name} className="hover-scale cursor-pointer text-center p-4">
                <div className="flex flex-col items-center space-y-2">
                  <Icon name={genre.icon as any} size={32} className="text-primary" />
                  <h4 className="font-semibold">{genre.name}</h4>
                  <Badge variant="secondary">{genre.count} игр</Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">💬 Отзывы покупателей</h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {reviews.map((review) => (
              <Card key={review.id}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">{review.user}</CardTitle>
                    <div className="flex">
                      {Array.from({ length: review.rating }, (_, i) => (
                        <Icon key={i} name="Star" size={16} className="text-yellow-400" fill="currentColor" />
                      ))}
                    </div>
                  </div>
                  <CardDescription>Купил: {review.game}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">"{review.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact/Support */}
      <section id="support" className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-8">🎧 Нужна помощь?</h3>
          <p className="text-xl text-muted-foreground mb-8">
            Наша команда поддержки работает 24/7
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Button variant="outline" className="hover-scale">
              <Icon name="MessageCircle" className="mr-2" size={20} />
              Онлайн чат
            </Button>
            <Button variant="outline" className="hover-scale">
              <Icon name="Mail" className="mr-2" size={20} />
              Email поддержка
            </Button>
            <Button variant="outline" className="hover-scale">
              <Icon name="Phone" className="mr-2" size={20} />
              Телефон
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold text-lg mb-4 gradient-text">SteamKeys Store</h4>
              <p className="text-muted-foreground">
                Надежный магазин Steam-ключей с мгновенной доставкой
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Каталог</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Новинки</a></li>
                <li><a href="#" className="hover:text-primary">Скидки</a></li>
                <li><a href="#" className="hover:text-primary">Топ игры</a></li>
                <li><a href="#" className="hover:text-primary">Жанры</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Поддержка</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">FAQ</a></li>
                <li><a href="#" className="hover:text-primary">Контакты</a></li>
                <li><a href="#" className="hover:text-primary">Гарантии</a></li>
                <li><a href="#" className="hover:text-primary">Возврат</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Следите за нами</h4>
              <div className="flex space-x-4">
                <Button variant="ghost" size="icon">
                  <Icon name="Github" size={20} />
                </Button>
                <Button variant="ghost" size="icon">
                  <Icon name="Twitter" size={20} />
                </Button>
                <Button variant="ghost" size="icon">
                  <Icon name="Instagram" size={20} />
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center">
            <p className="text-muted-foreground">
              © 2024 SteamKeys Store. Все права защищены.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;