import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const Footer = () => {
  return (
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
  );
};

export default Footer;