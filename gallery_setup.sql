-- Create Gallery Table
CREATE TABLE gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL,
  src TEXT NOT NULL,
  alt TEXT NOT NULL,
  aspect TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

-- Allow public read
CREATE POLICY "Allow public read" ON gallery FOR SELECT TO anon USING (true);

-- Insert seed data
INSERT INTO gallery (category, src, alt, aspect) VALUES
('Arrival', '/images/gallery-arrival-1.png', 'Families arriving and checking in at VBS', 'landscape'),
('Arrival', '/images/gallery-arrival-2.png', 'Excited kids lining up at VBS entrance', 'square'),
('Breakout Session', '/images/gallery-breakout-1.png', 'Small group breakout session with a leader', 'square'),
('Breakout Session', '/images/gallery-breakout-2.png', 'Children doing arts and crafts in a breakout group', 'landscape'),
('Closing Ceremony', '/images/gallery-closing-1.png', 'Grand closing ceremony on stage with confetti', 'landscape'),
('Closing Ceremony', '/images/gallery-closing-2.png', 'Kids performing for parents at closing ceremony', 'landscape'),
('Departures', '/images/gallery-departures-1.png', 'Children hugging goodbye and leaving with parents', 'landscape'),
('Indoor Games', '/images/gallery-indoor-1.png', 'Kids competing in balloon pop relay race indoors', 'landscape'),
('Lunch', '/images/gallery-lunch-1.png', 'Children laughing together at colorful lunch tables', 'landscape'),
('Lunch', '/images/gallery-lunch-2.png', 'Kids enjoying snacks and treats at VBS', 'square'),
('Outdoor Games', '/images/gallery-outdoor-1.png', 'Tug of war competition on a sunny field at VBS', 'landscape'),
('Outdoor Games', '/images/gallery-outdoor-2.png', 'Kids running relay races outside at VBS', 'square'),
('Prayers', '/images/gallery-prayers-1.png', 'Children holding hands in a prayer circle at sunset', 'square'),
('Presentations', '/images/gallery-presentation-1.png', 'Proud child presenting their artwork to the group', 'landscape'),
('Teaching', '/images/gallery-teaching-1.png', 'Enthusiastic VBS teacher telling a Bible story to kids', 'landscape');
