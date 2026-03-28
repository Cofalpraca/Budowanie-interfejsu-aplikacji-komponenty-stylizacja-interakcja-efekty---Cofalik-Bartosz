# Zadania React Native z Expo

Projekt zawiera dwa ekrany przygotowane w React Native w srodowisku Expo:

- Zadanie 1: katalog wydarzen z wyszukiwaniem, filtrowaniem i ulubionymi
- Zadanie 2: panel uzytkownika z formularzem, walidacja i ustawieniami

## Uruchomienie

1. Zainstaluj zaleznosci:

```bash
npm install
```

2. Uruchom projekt:

```bash
npm start
```

3. Po uruchomieniu Expo mozna:

- nacisnac `w`, aby otworzyc projekt w przegladarce
- nacisnac `a`, aby otworzyc projekt w emulatorze Androida
- zeskanowac kod QR w aplikacji Expo Go na telefonie

## Zawartosc projektu

- `App.js` - glowna aplikacja z oboma ekranami
- `app.json` - podstawowa konfiguracja Expo
- `package.json` - zaleznosci i skrypty projektu

## Wymagania zrealizowane w projekcie

### Zadanie 1

- naglowek aplikacji z opisem
- wyszukiwanie przez `TextInput`
- filtrowanie kategorii przez `Pressable`
- lista wydarzen renderowana przez `FlatList`
- osobny komponent karty wydarzenia
- aktualizacja stanu ulubionych
- licznik widocznych wynikow
- rozszerzenia: badge i tryb tylko ulubionych

### Zadanie 2

- karta profilu uzytkownika
- kontrolowany formularz edycji danych
- walidacja danych i komunikaty
- sekcja ustawien z osobnym komponentem wiersza
- przewijanie przez `ScrollView`
- zmiana motywu jasny / ciemny
- rozszerzenia: licznik bio, pokaz/ukryj haslo, sekcja wylogowania
