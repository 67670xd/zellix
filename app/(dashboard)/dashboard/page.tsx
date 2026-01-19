'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Navbar } from '@/components/dashboard/Navbar';
import { Button } from '@/components/ui/Button';

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cyberpunk-bg">
        <div className="text-center">
          <div className="mb-4 text-6xl animate-spin">⚙️</div>
          <p className="text-cyberpunk-text">Инициализация системы...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-cyberpunk-bg">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-12">
        {/* Welcome Header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            {session.user?.image && (
              <img
                src={session.user.image}
                alt={session.user.name || 'User'}
                className="w-16 h-16 rounded-lg border-2 border-cyberpunk-primary"
              />
            )}
            <div>
              <h1 className="text-4xl sm:text-5xl font-black">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyberpunk-primary via-cyberpunk-accent to-cyberpunk-secondary">
                  Добро пожаловать, {session.user?.name}!
                </span>
              </h1>
              <p className="text-cyberpunk-text/70">Ваша игровая империя ждёт</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card hover glow>
            <CardContent>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-cyberpunk-text/70 text-sm font-semibold mb-2">Кредиты Zellix</p>
                  <div className="text-4xl font-black text-cyberpunk-primary">
                    {session.user?.zellixCredits ?? 5250}
                  </div>
                </div>
                <div className="text-3xl">💎</div>
              </div>
              <div className="mt-4 text-xs text-green-400">↑ +250 на этой неделе</div>
            </CardContent>
          </Card>

          <Card hover glow>
            <CardContent>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-cyberpunk-text/70 text-sm font-semibold mb-2">Событий посещено</p>
                  <div className="text-4xl font-black text-cyberpunk-secondary">8</div>
                </div>
                <div className="text-3xl">📅</div>
              </div>
              <div className="mt-4 text-xs text-cyberpunk-text/50">
                <Link href="/events" className="text-cyberpunk-primary hover:underline">Предстоящие →</Link>
              </div>
            </CardContent>
          </Card>

          <Card hover glow>
            <CardContent>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-cyberpunk-text/70 text-sm font-semibold mb-2">Достижений</p>
                  <div className="text-4xl font-black text-cyberpunk-accent">12</div>
                </div>
                <div className="text-3xl">🏆</div>
              </div>
              <div className="mt-4 text-xs text-green-400">↑ Легендарный уровень</div>
            </CardContent>
          </Card>

          <Card hover glow>
            <CardContent>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-cyberpunk-text/70 text-sm font-semibold mb-2">Друзья</p>
                  <div className="text-4xl font-black text-cyberpunk-primary">24</div>
                </div>
                <div className="text-3xl">👥</div>
              </div>
              <div className="mt-4 text-xs text-cyberpunk-text/50">
                <Link href="/people" className="text-cyberpunk-primary hover:underline">Смотреть → </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-cyberpunk-primary mb-6">Быстрые действия</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link href="/games">
              <Card hover>
                <CardContent>
                  <div className="text-3xl mb-3">🎮</div>
                  <h3 className="font-semibold text-cyberpunk-text mb-2">Играть</h3>
                  <p className="text-sm text-cyberpunk-text/70">Заработай кредиты в минигеймах</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/events">
              <Card hover>
                <CardContent>
                  <div className="text-3xl mb-3">🎭</div>
                  <h3 className="font-semibold text-cyberpunk-text mb-2">События</h3>
                  <p className="text-sm text-cyberpunk-text/70">Участвуй в турнирах сообщества</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/leaderboards">
              <Card hover>
                <CardContent>
                  <div className="text-3xl mb-3">📊</div>
                  <h3 className="font-semibold text-cyberpunk-text mb-2">Рейтинг</h3>
                  <p className="text-sm text-cyberpunk-text/70">Проверь рейтинги сообщества</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/people">
              <Card hover>
                <CardContent>
                  <div className="text-3xl mb-3">👾</div>
                  <h3 className="font-semibold text-cyberpunk-text mb-2">Люди</h3>
                  <p className="text-sm text-cyberpunk-text/70">Найди друзей и соперников</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Недавняя активность</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-cyberpunk-primary/20">
                  <div className="text-2xl">🎮</div>
                  <div className="flex-1">
                    <p className="text-cyberpunk-text font-medium">Завершила Snake Game</p>
                    <p className="text-sm text-cyberpunk-text/50">2 часа назад · +150 кредитов</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 pb-3 border-b border-cyberpunk-primary/20">
                  <div className="text-2xl">🏆</div>
                  <div className="flex-1">
                    <p className="text-cyberpunk-text font-medium">Разблокирована медаль "Мастер"</p>
                    <p className="text-sm text-cyberpunk-text/50">Вчера · Достижение</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 pb-3 border-b border-cyberpunk-primary/20">
                  <div className="text-2xl">📅</div>
                  <div className="flex-1">
                    <p className="text-cyberpunk-text font-medium">Зарегистрирована на "Snake Masters Tournament"</p>
                    <p className="text-sm text-cyberpunk-text/50">3 дня назад · Событие</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-2xl">👥</div>
                  <div className="flex-1">
                    <p className="text-cyberpunk-text font-medium">Стала друзьями с EliteGamer_X</p>
                    <p className="text-sm text-cyberpunk-text/50">1 неделю назад · Друзья</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Достижения</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-2">
                  <div className="text-3xl">🥇</div>
                  <div>
                    <p className="font-semibold text-cyberpunk-text">Чемпион</p>
                    <p className="text-xs text-cyberpunk-text/50">Займи 1 место в рейтинге</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="text-3xl">⭐</div>
                  <div>
                    <p className="font-semibold text-cyberpunk-text">Звёздный путь</p>
                    <p className="text-xs text-cyberpunk-text/50">Играй 30 дней подряд</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="text-3xl">💰</div>
                  <div>
                    <p className="font-semibold text-cyberpunk-text">Миллионер</p>
                    <p className="text-xs text-cyberpunk-text/50">Накопи 1М кредитов</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
