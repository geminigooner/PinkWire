#!/bin/bash
FILES=$(find src/applications/guestbook -type f -name "*.tsx")

for file in $FILES; do
  sed -i 's/bg-\[\#fdfbf7\]/bg-black\/20/g' "$file"
  sed -i 's/bg-white\/50/bg-white\/10/g' "$file"
  sed -i 's/bg-white/bg-os-window-bg/g' "$file"
  sed -i 's/border-\[\#eaddd7\]/border-os-window-border/g' "$file"
  sed -i 's/text-\[\#4a3f3a\]/text-os-text/g' "$file"
  sed -i 's/text-\[\#a3948e\]/text-os-text-muted/g' "$file"
  sed -i 's/text-\[\#7a6f6a\]/text-os-text-muted/g' "$file"
  sed -i 's/text-\[\#bcaaa4\]/text-os-text-muted/g' "$file"
  sed -i 's/text-\[\#d6c7c1\]/text-os-text-muted\/50/g' "$file"
  sed -i 's/bg-\[\#f8f4f0\]/bg-black\/30/g' "$file"
  sed -i 's/hover:bg-\[\#f0e6e2\]\/50/hover:bg-white\/5/g' "$file"
  sed -i 's/hover:bg-\[\#f0e6e2\]/hover:bg-white\/10/g' "$file"
  sed -i 's/bg-\[\#f0e6e2\]/bg-os-accent\/20/g' "$file"
  sed -i 's/text-\[\#cf8c8c\]/text-os-accent/g' "$file"
  sed -i 's/ring-\[\#cf8c8c\]/ring-os-accent/g' "$file"
  sed -i 's/ring-\[\#eaddd7\]/ring-os-window-border/g' "$file"
  sed -i 's/bg-\[\#cf8c8c\]/bg-os-accent/g' "$file"
  sed -i 's/hover:bg-\[\#b87a7a\]/hover:bg-os-accent-hover/g' "$file"
  sed -i 's/bg-\[\#fef3c7\]/bg-yellow-500\/20/g' "$file"
  sed -i 's/hover:bg-\[\#fef3c7\]/hover:bg-yellow-500\/20/g' "$file"
  sed -i 's/bg-\[\#4a3f3a\]\/20/bg-black\/40/g' "$file"
done
