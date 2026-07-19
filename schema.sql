-- ============================================
-- WebFRIENDS - Schema SQL
-- EJECUTAR ESTO EN: Supabase > SQL Editor > New Query
-- ============================================

-- 1. WHITELIST DE EMAILS PERMITIDOS
-- Solo estos emails pueden registrarse. Agrega los de tus amigos.
CREATE TABLE IF NOT EXISTS allowed_emails (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  added_by TEXT DEFAULT 'admin',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO allowed_emails (email) VALUES
  ('tucorreo@gmail.com');  -- CAMBIA ESTO por tu correo real

-- 2. PERFILES DE USUARIO (1:1 con auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  avatar_url TEXT DEFAULT '',
  bio TEXT DEFAULT '',
  theme_color TEXT DEFAULT '#ec4899',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TRIGGER: crea perfil automático + verifica whitelist al registrarse
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM allowed_emails WHERE LOWER(email) = LOWER(NEW.email)) THEN
    RAISE EXCEPTION 'Email no autorizado';
  END IF;
  INSERT INTO profiles (id, username)
  VALUES (NEW.id, SPLIT_PART(NEW.email, '@', 1));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- 4. FOTOS
CREATE TABLE IF NOT EXISTS photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  image_url TEXT NOT NULL,
  description TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. COMENTARIOS
CREATE TABLE IF NOT EXISTS comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  photo_id UUID REFERENCES photos(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. SERIES/ANIME TRACKER
CREATE TABLE IF NOT EXISTS series_tracker (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  type TEXT DEFAULT 'anime' CHECK (type IN ('anime','serie','pelicula')),
  status TEXT DEFAULT 'viendo' CHECK (status IN ('viendo','completado','dropeado','pendiente')),
  rating INTEGER CHECK (rating >= 1 AND rating <= 10),
  review TEXT DEFAULT '',
  spotify_url TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. SPOTIFY EMBEDS
CREATE TABLE IF NOT EXISTS spotify_embeds (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  spotify_url TEXT NOT NULL,
  title TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. REACCIONES
CREATE TABLE IF NOT EXISTS reactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  photo_id UUID REFERENCES photos(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  reaction_type TEXT DEFAULT 'heart' CHECK (reaction_type IN ('heart','star','cool','fire')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(photo_id, user_id)
);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE series_tracker ENABLE ROW LEVEL SECURITY;
ALTER TABLE spotify_embeds ENABLE ROW LEVEL SECURITY;
ALTER TABLE reactions ENABLE ROW LEVEL SECURITY;

-- Profiles
DROP POLICY IF EXISTS "Ver perfiles" ON profiles;
CREATE POLICY "Ver perfiles" ON profiles FOR SELECT USING (true);
DROP POLICY IF EXISTS "Editar mi perfil" ON profiles;
CREATE POLICY "Editar mi perfil" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Photos
DROP POLICY IF EXISTS "Ver fotos" ON photos;
CREATE POLICY "Ver fotos" ON photos FOR SELECT USING (true);
DROP POLICY IF EXISTS "Subir fotos" ON photos;
CREATE POLICY "Subir fotos" ON photos FOR INSERT WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "Borrar mis fotos" ON photos;
CREATE POLICY "Borrar mis fotos" ON photos FOR DELETE USING (auth.uid() = user_id);

-- Comments
DROP POLICY IF EXISTS "Ver comentarios" ON comments;
CREATE POLICY "Ver comentarios" ON comments FOR SELECT USING (true);
DROP POLICY IF EXISTS "Comentar" ON comments;
CREATE POLICY "Comentar" ON comments FOR INSERT WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "Borrar mi comentario" ON comments;
CREATE POLICY "Borrar mi comentario" ON comments FOR DELETE USING (auth.uid() = user_id);

-- Series Tracker
DROP POLICY IF EXISTS "Ver series" ON series_tracker;
CREATE POLICY "Ver series" ON series_tracker FOR SELECT USING (true);
DROP POLICY IF EXISTS "Agregar serie" ON series_tracker;
CREATE POLICY "Agregar serie" ON series_tracker FOR INSERT WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "Editar mi serie" ON series_tracker;
CREATE POLICY "Editar mi serie" ON series_tracker FOR UPDATE USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Borrar mi serie" ON series_tracker;
CREATE POLICY "Borrar mi serie" ON series_tracker FOR DELETE USING (auth.uid() = user_id);

-- Spotify
DROP POLICY IF EXISTS "Ver playlists" ON spotify_embeds;
CREATE POLICY "Ver playlists" ON spotify_embeds FOR SELECT USING (true);
DROP POLICY IF EXISTS "Agregar playlist" ON spotify_embeds;
CREATE POLICY "Agregar playlist" ON spotify_embeds FOR INSERT WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "Borrar mi playlist" ON spotify_embeds;
CREATE POLICY "Borrar mi playlist" ON spotify_embeds FOR DELETE USING (auth.uid() = user_id);

-- Reactions
DROP POLICY IF EXISTS "Ver reacciones" ON reactions;
CREATE POLICY "Ver reacciones" ON reactions FOR SELECT USING (true);
DROP POLICY IF EXISTS "Reaccionar" ON reactions;
CREATE POLICY "Reaccionar" ON reactions FOR INSERT WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "Quitar reaccion" ON reactions;
CREATE POLICY "Quitar reaccion" ON reactions FOR DELETE USING (auth.uid() = user_id);
