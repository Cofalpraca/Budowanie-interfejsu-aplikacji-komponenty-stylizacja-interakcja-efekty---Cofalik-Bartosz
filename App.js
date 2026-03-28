import React, { useMemo, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
} from "react-native";

const EVENT_CATEGORIES = ["Wszystkie", "Nauka", "Sport", "Muzyka", "Film"];
const BIO_LIMIT = 140;

const EVENT_DATA = [
  {
    id: "1",
    title: "Warsztaty AI dla Poczatkujacych",
    date: "12 kwietnia 2026",
    category: "Nauka",
    location: "Warszawa",
    favorite: true,
    badge: "Popularne",
  },
  {
    id: "2",
    title: "Poranny Bieg Miejski",
    date: "14 kwietnia 2026",
    category: "Sport",
    location: "Krakow",
    favorite: false,
    badge: "Nowe",
  },
  {
    id: "3",
    title: "Koncert Indie Nights",
    date: "18 kwietnia 2026",
    category: "Muzyka",
    location: "Gdansk",
    favorite: false,
    badge: "Wyprzedaje sie",
  },
  {
    id: "4",
    title: "Maraton Filmow Sci-Fi",
    date: "20 kwietnia 2026",
    category: "Film",
    location: "Wroclaw",
    favorite: true,
    badge: "Popularne",
  },
  {
    id: "5",
    title: "Hackathon Green Tech",
    date: "24 kwietnia 2026",
    category: "Nauka",
    location: "Poznan",
    favorite: false,
    badge: "Nowe",
  },
  {
    id: "6",
    title: "Turniej Siatkowki Plazowej",
    date: "27 kwietnia 2026",
    category: "Sport",
    location: "Sopot",
    favorite: false,
    badge: "Rodzinne",
  },
];

const INITIAL_PROFILE = {
  name: "Marta Kowalska",
  email: "marta@example.com",
  city: "Lodz",
  bio: "Projektantka produktow cyfrowych, lubi podroze, kawe specialty i aplikacje mobilne.",
  password: "tajne123",
};

const LIGHT_THEME = {
  background: "#f4efe7",
  card: "#fffaf4",
  cardStrong: "#f6e4c9",
  text: "#1f1b16",
  muted: "#6f6558",
  border: "#e2d3bd",
  accent: "#c46d1a",
  accentSoft: "#f2d0a8",
  success: "#2f855a",
  error: "#b83232",
  shadow: "#00000018",
};

const DARK_THEME = {
  background: "#16181c",
  card: "#22262d",
  cardStrong: "#2c3139",
  text: "#f5f2ec",
  muted: "#b6b0a8",
  border: "#3c434d",
  accent: "#f2a65a",
  accentSoft: "#51361c",
  success: "#68d391",
  error: "#fc8181",
  shadow: "#00000030",
};

function ScreenSwitch({ activeScreen, onChange, theme }) {
  return (
    <View style={[styles.switchRow, { backgroundColor: theme.cardStrong }]}>
      {[
        { key: "events", label: "Zadanie 1" },
        { key: "profile", label: "Zadanie 2" },
      ].map((item) => {
        const active = activeScreen === item.key;

        return (
          <Pressable
            key={item.key}
            onPress={() => onChange(item.key)}
            style={[
              styles.switchButton,
              {
                backgroundColor: active ? theme.accent : "transparent",
                borderColor: active ? theme.accent : "transparent",
              },
            ]}
          >
            <Text
              style={[
                styles.switchLabel,
                { color: active ? "#fffaf4" : theme.text },
              ]}
            >
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function FilterChip({ label, active, onPress, theme }) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.chip,
        {
          backgroundColor: active ? theme.accent : theme.card,
          borderColor: active ? theme.accent : theme.border,
        },
      ]}
    >
      <Text style={[styles.chipLabel, { color: active ? "#fffaf4" : theme.text }]}>
        {label}
      </Text>
    </Pressable>
  );
}

function EventCard({
  title,
  date,
  category,
  location,
  favorite,
  badge,
  onToggleFavorite,
  theme,
}) {
  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
          shadowColor: theme.shadow,
        },
      ]}
    >
      <View style={styles.cardTopRow}>
        <View style={styles.cardHeaderContent}>
          <Text style={[styles.cardTitle, { color: theme.text }]}>{title}</Text>
          <Text style={[styles.cardMeta, { color: theme.muted }]}>
            {date} - {location}
          </Text>
        </View>
        <View style={[styles.badge, { backgroundColor: theme.accentSoft }]}>
          <Text style={[styles.badgeText, { color: theme.accent }]}>{badge}</Text>
        </View>
      </View>

      <View style={styles.cardFooter}>
        <Text style={[styles.categoryPill, { color: theme.accent, borderColor: theme.border }]}>
          {category}
        </Text>
        <Pressable
          onPress={onToggleFavorite}
          style={[
            styles.favoriteButton,
            {
              backgroundColor: favorite ? theme.accent : theme.cardStrong,
            },
          ]}
        >
          <Text
            style={[
              styles.favoriteLabel,
              { color: favorite ? "#fffaf4" : theme.text },
            ]}
          >
            {favorite ? "W ulubionych" : "Dodaj do ulubionych"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

function EventsScreen({ theme }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Wszystkie");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [events, setEvents] = useState(EVENT_DATA);

  const filteredEvents = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return events.filter((event) => {
      const matchesCategory =
        activeCategory === "Wszystkie" || event.category === activeCategory;
      const matchesQuery = event.title.toLowerCase().includes(normalizedQuery);
      const matchesFavorite = !showFavoritesOnly || event.favorite;

      return matchesCategory && matchesQuery && matchesFavorite;
    });
  }, [activeCategory, events, query, showFavoritesOnly]);

  const toggleFavorite = (id) => {
    setEvents((currentEvents) =>
      currentEvents.map((event) =>
        event.id === id ? { ...event, favorite: !event.favorite } : event
      )
    );
  };

  return (
    <View style={styles.screenBlock}>
      <View
        style={[
          styles.heroCard,
          { backgroundColor: theme.card, borderColor: theme.border },
        ]}
      >
        <Text style={[styles.screenTitle, { color: theme.text }]}>
          Katalog wydarzen
        </Text>
        <Text style={[styles.screenDescription, { color: theme.muted }]}>
          Odkrywaj lokalne wydarzenia i zapisuj te, ktore chcesz miec pod reka.
        </Text>
        <Text style={[styles.resultCount, { color: theme.accent }]}>
          Widoczne wyniki: {filteredEvents.length}
        </Text>
      </View>

      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Szukaj wydarzenia..."
        placeholderTextColor={theme.muted}
        style={[
          styles.searchInput,
          {
            backgroundColor: theme.card,
            borderColor: theme.border,
            color: theme.text,
          },
        ]}
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipRow}
        style={styles.horizontalSection}
      >
        {EVENT_CATEGORIES.map((category) => (
          <FilterChip
            key={category}
            label={category}
            active={category === activeCategory}
            onPress={() => setActiveCategory(category)}
            theme={theme}
          />
        ))}
      </ScrollView>

      <Pressable
        onPress={() => setShowFavoritesOnly((current) => !current)}
        style={[
          styles.secondaryAction,
          {
            backgroundColor: showFavoritesOnly ? theme.accentSoft : theme.card,
            borderColor: theme.border,
          },
        ]}
      >
        <Text style={[styles.secondaryActionText, { color: theme.text }]}>
          {showFavoritesOnly ? "Pokazuje tylko ulubione" : "Wlacz tylko ulubione"}
        </Text>
      </Pressable>

      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <EventCard
            {...item}
            onToggleFavorite={() => toggleFavorite(item.id)}
            theme={theme}
          />
        )}
        ListEmptyComponent={
          <View
            style={[
              styles.emptyState,
              { backgroundColor: theme.card, borderColor: theme.border },
            ]}
          >
            <Text style={[styles.emptyStateTitle, { color: theme.text }]}>
              Brak wynikow
            </Text>
            <Text style={[styles.emptyStateText, { color: theme.muted }]}>
              Sprobuj zmienic tekst wyszukiwania albo wybrac inna kategorie.
            </Text>
          </View>
        }
      />
    </View>
  );
}

function FormField({
  label,
  value,
  onChangeText,
  placeholder,
  theme,
  multiline = false,
  secureTextEntry = false,
  children,
}) {
  return (
    <View style={styles.formField}>
      <Text style={[styles.fieldLabel, { color: theme.text }]}>{label}</Text>
      <View
        style={[
          styles.inputShell,
          {
            backgroundColor: theme.card,
            borderColor: theme.border,
            minHeight: multiline ? 126 : 58,
          },
        ]}
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.muted}
          multiline={multiline}
          secureTextEntry={secureTextEntry}
          style={[
            styles.formInput,
            {
              color: theme.text,
              textAlignVertical: multiline ? "top" : "center",
              minHeight: multiline ? 108 : 24,
              paddingRight: children ? 52 : 0,
            },
          ]}
        />
        {children}
      </View>
    </View>
  );
}

function SettingsRow({ label, value, onPress, theme, danger = false }) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.settingsRow,
        { backgroundColor: theme.card, borderColor: theme.border },
      ]}
    >
      <Text
        style={[
          styles.settingsLabel,
          { color: danger ? theme.error : theme.text },
        ]}
      >
        {label}
      </Text>
      <Text style={[styles.settingsValue, { color: theme.muted }]}>{value}</Text>
    </Pressable>
  );
}

function ProfileScreen({ darkMode, onToggleTheme }) {
  const theme = darkMode ? DARK_THEME : LIGHT_THEME;
  const [form, setForm] = useState(INITIAL_PROFILE);
  const [message, setMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const updateField = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
    setMessage(null);
  };

  const validateForm = () => {
    if (!form.name.trim()) {
      return { type: "error", text: "Imie jest wymagane." };
    }

    if (!form.email.includes("@")) {
      return { type: "error", text: "E-mail musi zawierac znak @." };
    }

    if (form.bio.length > BIO_LIMIT) {
      return {
        type: "error",
        text: `Bio moze miec maksymalnie ${BIO_LIMIT} znakow.`,
      };
    }

    return { type: "success", text: "Zmiany zostaly zapisane poprawnie." };
  };

  const handleSave = () => {
    setMessage(validateForm());
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.profileScrollContent}
    >
      <View
        style={[
          styles.profileCard,
          { backgroundColor: theme.card, borderColor: theme.border },
        ]}
      >
        <View style={[styles.avatar, { backgroundColor: theme.accentSoft }]}>
          <Text style={[styles.avatarText, { color: theme.accent }]}>MK</Text>
        </View>
        <Text style={[styles.profileName, { color: theme.text }]}>{form.name}</Text>
        <Text style={[styles.profileMeta, { color: theme.muted }]}>
          {form.city} - Projektowanie produktow
        </Text>
        <Text style={[styles.profileBio, { color: theme.text }]}>{form.bio}</Text>
      </View>

      <View
        style={[
          styles.sectionCard,
          { backgroundColor: theme.cardStrong, borderColor: theme.border },
        ]}
      >
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Edycja profilu
        </Text>

        <FormField
          label="Imie"
          value={form.name}
          onChangeText={(value) => updateField("name", value)}
          placeholder="Wpisz imie"
          theme={theme}
        />

        <FormField
          label="E-mail"
          value={form.email}
          onChangeText={(value) => updateField("email", value)}
          placeholder="Wpisz e-mail"
          theme={theme}
        />

        <FormField
          label="Miasto"
          value={form.city}
          onChangeText={(value) => updateField("city", value)}
          placeholder="Wpisz miasto"
          theme={theme}
        />

        <FormField
          label="Haslo"
          value={form.password}
          onChangeText={(value) => updateField("password", value)}
          placeholder="Wpisz haslo"
          theme={theme}
          secureTextEntry={!showPassword}
        >
          <Pressable
            onPress={() => setShowPassword((current) => !current)}
            style={styles.inlineAction}
          >
            <Text style={[styles.inlineActionText, { color: theme.accent }]}>
              {showPassword ? "Ukryj" : "Pokaz"}
            </Text>
          </Pressable>
        </FormField>

        <FormField
          label="Bio"
          value={form.bio}
          onChangeText={(value) => updateField("bio", value)}
          placeholder="Napisz cos o sobie"
          theme={theme}
          multiline
        />

        <Text
          style={[
            styles.counterText,
            {
              color: form.bio.length > BIO_LIMIT ? theme.error : theme.muted,
            },
          ]}
        >
          {form.bio.length}/{BIO_LIMIT} znakow
        </Text>

        {message ? (
          <View
            style={[
              styles.messageBox,
              {
                backgroundColor:
                  message.type === "success" ? theme.accentSoft : theme.card,
                borderColor:
                  message.type === "success" ? theme.success : theme.error,
              },
            ]}
          >
            <Text
              style={[
                styles.messageText,
                {
                  color: message.type === "success" ? theme.success : theme.error,
                },
              ]}
            >
              {message.text}
            </Text>
          </View>
        ) : null}

        <Pressable
          onPress={handleSave}
          style={[styles.primaryButton, { backgroundColor: theme.accent }]}
        >
          <Text style={styles.primaryButtonText}>Zapisz zmiany</Text>
        </Pressable>
      </View>

      <View
        style={[
          styles.sectionCard,
          { backgroundColor: theme.cardStrong, borderColor: theme.border },
        ]}
      >
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Ustawienia
        </Text>

        <SettingsRow
          label="Powiadomienia"
          value="Wlaczone"
          onPress={() => setMessage({ type: "success", text: "Powiadomienia pozostaly wlaczone." })}
          theme={theme}
        />
        <SettingsRow
          label="Prywatnosc"
          value="Tylko znajomi"
          onPress={() => setMessage({ type: "success", text: "Ustawienia prywatnosci sa aktualne." })}
          theme={theme}
        />
        <SettingsRow
          label="Ciemny motyw"
          value={darkMode ? "Aktywny" : "Wylaczony"}
          onPress={onToggleTheme}
          theme={theme}
        />
        <SettingsRow
          label="O aplikacji"
          value="Wersja 1.0"
          onPress={() => setMessage({ type: "success", text: "To demo panelu uzytkownika w React Native." })}
          theme={theme}
        />
      </View>

      <View
        style={[
          styles.logoutBox,
          { backgroundColor: theme.card, borderColor: theme.border },
        ]}
      >
        <Text style={[styles.logoutTitle, { color: theme.text }]}>
          Bezpieczenstwo konta
        </Text>
        <Text style={[styles.logoutText, { color: theme.muted }]}>
          Mozesz zakonczyc sesje na tym urzadzeniu jednym kliknieciem.
        </Text>
        <SettingsRow
          label="Wyloguj"
          value="Akcja"
          onPress={() => setMessage({ type: "success", text: "Symulacja wylogowania zakonczona." })}
          theme={theme}
          danger
        />
      </View>
    </ScrollView>
  );
}

export default function App() {
  const [activeScreen, setActiveScreen] = useState("events");
  const [darkMode, setDarkMode] = useState(false);

  const theme = darkMode ? DARK_THEME : LIGHT_THEME;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={darkMode ? "light-content" : "dark-content"} />
      <View style={[styles.appContainer, { backgroundColor: theme.background }]}>
        <ScreenSwitch
          activeScreen={activeScreen}
          onChange={setActiveScreen}
          theme={theme}
        />

        {activeScreen === "events" ? (
          <EventsScreen theme={theme} />
        ) : (
          <ProfileScreen
            darkMode={darkMode}
            onToggleTheme={() => setDarkMode((current) => !current)}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  appContainer: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 18,
  },
  switchRow: {
    flexDirection: "row",
    padding: 6,
    borderRadius: 18,
    marginBottom: 16,
  },
  switchButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    borderWidth: 1,
    minHeight: 46,
  },
  switchLabel: {
    fontSize: 14,
    fontWeight: "700",
  },
  screenBlock: {
    flex: 1,
  },
  heroCard: {
    borderWidth: 1,
    borderRadius: 24,
    padding: 18,
    marginBottom: 14,
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 6,
  },
  screenDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  resultCount: {
    marginTop: 12,
    fontSize: 15,
    fontWeight: "700",
  },
  searchInput: {
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    marginBottom: 12,
  },
  horizontalSection: {
    minHeight: 52,
    marginBottom: 8,
  },
  chipRow: {
    paddingVertical: 4,
    paddingRight: 8,
    alignItems: "center",
  },
  chip: {
    minHeight: 40,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1,
    justifyContent: "center",
    marginRight: 8,
  },
  chipLabel: {
    fontSize: 13,
    fontWeight: "700",
  },
  secondaryAction: {
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 14,
    alignSelf: "flex-start",
  },
  secondaryActionText: {
    fontSize: 13,
    fontWeight: "700",
  },
  listContent: {
    paddingBottom: 28,
  },
  card: {
    borderWidth: 1,
    borderRadius: 22,
    padding: 16,
    marginBottom: 12,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 3,
  },
  cardTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
    gap: 12,
  },
  cardHeaderContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 6,
  },
  cardMeta: {
    fontSize: 13,
    lineHeight: 18,
  },
  badge: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "800",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  categoryPill: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    overflow: "hidden",
    fontSize: 12,
    fontWeight: "700",
  },
  favoriteButton: {
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  favoriteLabel: {
    fontSize: 13,
    fontWeight: "700",
  },
  emptyState: {
    borderWidth: 1,
    borderRadius: 22,
    padding: 24,
    alignItems: "center",
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 8,
  },
  emptyStateText: {
    textAlign: "center",
    fontSize: 14,
    lineHeight: 20,
  },
  profileScrollContent: {
    paddingBottom: 28,
  },
  profileCard: {
    borderWidth: 1,
    borderRadius: 24,
    padding: 20,
    alignItems: "center",
    marginBottom: 14,
  },
  avatar: {
    width: 82,
    height: 82,
    borderRadius: 41,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: "800",
  },
  profileName: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 4,
  },
  profileMeta: {
    fontSize: 14,
    marginBottom: 12,
  },
  profileBio: {
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
  },
  sectionCard: {
    borderWidth: 1,
    borderRadius: 24,
    padding: 18,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 16,
  },
  formField: {
    marginBottom: 14,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 8,
  },
  inputShell: {
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 14,
    justifyContent: "center",
    position: "relative",
  },
  formInput: {
    fontSize: 15,
  },
  inlineAction: {
    position: "absolute",
    right: 14,
    top: 16,
  },
  inlineActionText: {
    fontSize: 13,
    fontWeight: "700",
  },
  counterText: {
    alignSelf: "flex-end",
    fontSize: 12,
    marginTop: -4,
    marginBottom: 14,
  },
  messageBox: {
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 14,
  },
  messageText: {
    fontSize: 13,
    fontWeight: "700",
  },
  primaryButton: {
    minHeight: 52,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    color: "#fffaf4",
    fontSize: 15,
    fontWeight: "800",
  },
  settingsRow: {
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
  },
  settingsLabel: {
    fontSize: 15,
    fontWeight: "700",
    flex: 1,
  },
  settingsValue: {
    fontSize: 13,
    fontWeight: "600",
  },
  logoutBox: {
    borderWidth: 1,
    borderRadius: 24,
    padding: 18,
  },
  logoutTitle: {
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 6,
  },
  logoutText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 14,
  },
});
