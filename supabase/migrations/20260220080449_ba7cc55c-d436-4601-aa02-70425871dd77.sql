-- Make pdf bucket public
UPDATE storage.buckets SET public = true WHERE id = 'pdf';

-- Add public read policy for pdf bucket
CREATE POLICY "Public can read PDFs"
ON storage.objects FOR SELECT
USING (bucket_id = 'pdf');