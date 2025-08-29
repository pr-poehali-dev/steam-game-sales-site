import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import Icon from "@/components/ui/icon";
import { useState, useEffect } from "react";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState<Array<{id: number, title: string, price: string, image: string, quantity: number}>>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<any>(null);
  const [isGameModalOpen, setIsGameModalOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [filteredGames, setFilteredGames] = useState<typeof featuredGames>([]);

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

  // Functions for cart and filtering
  const addToCart = (game: typeof featuredGames[0]) => {
    const existingItem = cart.find(item => item.id === game.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === game.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, {
        id: game.id,
        title: game.title,
        price: game.price,
        image: game.image,
        quantity: 1
      }]);
    }
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      setCart(cart.map(item => 
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const price = parseInt(item.price.replace('₽', '').replace(',', ''));
      return total + (price * item.quantity);
    }, 0);
  };

  const openGameModal = (game: typeof featuredGames[0]) => {
    setSelectedGame(game);
    setIsGameModalOpen(true);
  };

  // Filter games based on search, price, and genre
  useEffect(() => {
    let filtered = [...featuredGames];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(game => 
        game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.genre.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by genre
    if (selectedGenre !== "all") {
      filtered = filtered.filter(game => game.genre === selectedGenre);
    }

    // Filter by price
    filtered = filtered.filter(game => {
      const price = parseInt(game.price.replace('₽', '').replace(',', ''));
      return price >= priceRange[0] && price <= priceRange[1];
    });

    setFilteredGames(filtered);
  }, [searchTerm, selectedGenre, priceRange]);

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
              <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Icon name="ShoppingCart" size={20} />
                    {cart.length > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                        {cart.reduce((total, item) => total + item.quantity, 0)}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Корзина</SheetTitle>
                    <SheetDescription>
                      {cart.length === 0 ? "Ваша корзина пуста" : `${cart.length} товар(ов) в корзине`}
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6 space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                        <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded" />
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">{item.title}</h4>
                          <p className="text-sm text-primary font-bold">{item.price}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Icon name="Minus" size={12} />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Icon name="Plus" size={12} />
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Icon name="Trash2" size={12} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  {cart.length > 0 && (
                    <div className="mt-6 space-y-4">
                      <div className="flex justify-between items-center text-lg font-bold">
                        <span>Итого:</span>
                        <span className="text-primary">₽{getTotalPrice().toLocaleString()}</span>
                      </div>
                      <Button className="w-full" size="lg">
                        <Icon name="CreditCard" className="mr-2" size={20} />
                        Оформить заказ
                      </Button>
                      <p className="text-sm text-muted-foreground text-center">
                        После оплаты Steam-ключи будут отправлены автоматически
                      </p>
                    </div>
                  )}
                </SheetContent>
              </Sheet>
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

      {/* Featured Games */}
      <section id="catalog" className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">🔥 Популярные игры</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGames.map((game) => (
              <Card key={game.id} className="game-card group">
                <div className="relative cursor-pointer" onClick={() => openGameModal(game)}>
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
                    <CardTitle className="text-lg cursor-pointer hover:text-primary" onClick={() => openGameModal(game)}>
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
                  <Button className="hover-scale" onClick={() => addToCart(game)}>
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
                        <Button size="sm" onClick={() => addToCart(game)}>Купить</Button>
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
                        <Button size="sm" onClick={() => addToCart(game)}>Купить</Button>
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
                        <Button size="sm" onClick={() => addToCart(game)}>Купить</Button>
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

      {/* Game Details Modal */}
      <Dialog open={isGameModalOpen} onOpenChange={setIsGameModalOpen}>
        <DialogContent className="max-w-2xl">
          {selectedGame && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl gradient-text">{selectedGame.title}</DialogTitle>
                <DialogDescription className="text-lg">{selectedGame.description}</DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <div className="relative">
                  <img 
                    src={selectedGame.image} 
                    alt={selectedGame.title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  {selectedGame.discount && (
                    <Badge className="absolute top-4 left-4 bg-secondary text-secondary-foreground text-lg px-3 py-1">
                      {selectedGame.discount}
                    </Badge>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Icon name="Star" size={16} className="text-yellow-400" fill="currentColor" />
                      <span className="font-semibold">Рейтинг: {selectedGame.rating}/5</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Tag" size={16} className="text-primary" />
                      <span>Жанр: <Badge variant="outline">{selectedGame.genre}</Badge></span>
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
                        <span className="text-3xl font-bold text-primary">{selectedGame.price}</span>
                        {selectedGame.originalPrice && (
                          <span className="text-lg text-muted-foreground line-through">
                            {selectedGame.originalPrice}
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
                          onClick={() => {
                            addToCart(selectedGame);
                            setIsGameModalOpen(false);
                            setIsCartOpen(true);
                          }}
                        >
                          <Icon name="ShoppingCart" className="mr-2" size={20} />
                          Добавить в корзину
                        </Button>
                        <Button 
                          variant="secondary" 
                          className="w-full"
                          onClick={() => {
                            addToCart(selectedGame);
                            setIsGameModalOpen(false);
                          }}
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
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;