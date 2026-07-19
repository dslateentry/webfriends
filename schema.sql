-- ═══════════════════════════════════════════════════════
-- WebFRIENDS - Schema SQL (Supabase)
-- Ejecutar en: Supabase → SQL Editor → New query
-- ═══════════════════════════════════════════════════════

-- 1. Whitelist de emails autorizados
CREATE TABLE IF NOT EXISTS public.allowed_emails (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  added_by TEXT DEFAULT 'admin',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Agregar emails autorizados aquí:
INSERT INTO public.allowed_emails (email) VALUES ('downeycutie.draws@gmail.com')
  ON CONFLICT (email) DO NOTHING;
-- Para agregar más amigos: INSERT INTO public.allowed_emails (email) VALUES ('amiga@gmail.com');

-- ───────────────────────────────────────────────────────
-- 2. Perfiles de usuario
-- ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  avatar_url TEXT DEFAULT '',
  bio TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS (Row Level Security)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Ver perfiles" ON public.profiles;
DROP POLICY IF EXISTS "Editar mi perfil" ON public.profiles;
DROP POLICY IF EXISTS "Insertar mi perfil" ON public.profiles;

CREATE POLICY "Ver perfiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Editar mi perfil" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Insertar mi perfil" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- ───────────────────────────────────────────────────────
-- 3. Resto de tablas
-- ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  description TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  photo_id UUID REFERENCES public.photos(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.guest_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  token TEXT UNIQUE NOT NULL,
  created_by UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  expires_at TIMESTAMPTZ NOT NULL,
  destroyed BOOLEAN DEFAULT false,
  destroy_reason TEXT DEFAULT ''
);

CREATE TABLE IF NOT EXISTS public.series_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  type TEXT DEFAULT 'anime',
  status TEXT DEFAULT 'viendo',
  rating NUMERIC(2,1) CHECK (rating >= 0.5 AND rating <= 5.0),
  review_text TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.guestbook_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  sticker TEXT DEFAULT '',
  font_style TEXT DEFAULT 'pixel',
  color TEXT DEFAULT '#ff1493',
  glitter_effect BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ───────────────────────────────────────────────────────
-- 4. Trigger: crear perfil automático al registrarse
--    (con validación de whitelist)
-- ───────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Verificar si el email está en la whitelist
  IF NOT EXISTS (
    SELECT 1 FROM public.allowed_emails WHERE email = NEW.email
  ) THEN
    RAISE EXCEPTION 'Email no autorizado. Contacta al admin para acceder.';
  END IF;

  -- Si está autorizado, crear el perfil automáticamente
  INSERT INTO public.profiles (id, username)
  VALUES (
    NEW.id,
    COALESCE(
      NULLIF(NEW.raw_user_meta_data->>'username', ''),  -- username del formulario web
      split_part(NEW.email, '@', 1)                      -- fallback: prefijo del email
    )
  )
  ON CONFLICT (id) DO NOTHING;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ───────────────────────────────────────────────────────
-- 5. Insertar perfil para usuarios creados manualmente
--    (ejecutar solo si el usuario ya existe en auth.users
--     pero NO tiene perfil en profiles)
-- ───────────────────────────────────────────────────────
-- INSERT INTO public.profiles (id, username)
-- SELECT id, 'dslateentry'
-- FROM auth.users
-- WHERE email = 'downeycutie.draws@gmail.com'
-- ON CONFLICT (id) DO UPDATE SET username = 'dslateentry';
