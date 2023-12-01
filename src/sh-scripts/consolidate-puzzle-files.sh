#!/bin/bash
mkdir bak/
cp -r input/ bak/input
cp -r solutions bak/solutions

mkdir puzzles
mv input/test.txt puzzles/test.txt

for file in solutions/*
do
  puzzle=$(basename $file .ts)
  echo $puzzle
  mkdir -p puzzles/$puzzle
  mv $file puzzles/$puzzle/solution.ts
done

for file in input/*
do
  puzzle=$(basename $file .txt)
  mkdir -p puzzles/$puzzle
  mv $file puzzles/$puzzle/input.txt
done

#rm -d solutions/ input/