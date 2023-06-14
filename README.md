# Moje Miasto
## Status usług
[![MojeMiasto.app](https://github.com/MojeMiasto/MojeMiasto.app/actions/workflows/node.js.yml/badge.svg)](https://github.com/MojeMiasto/MojeMiasto.app/actions/workflows/node.js.yml)

[![MojeMiasto.api deploy](https://github.com/MojeMiasto/MojeMiasto.api/actions/workflows/main_mojemiasto-api.yml/badge.svg)](https://github.com/MojeMiasto/MojeMiasto.api/actions/workflows/main_mojemiasto-api.yml)

[![MojeMiasto.NotificationService deploy](https://github.com/MojeMiasto/MojeMiasto.NotificationService/actions/workflows/main_moje-miasto-notification-service.yml/badge.svg)](https://github.com/MojeMiasto/MojeMiasto.NotificationService/actions/workflows/main_moje-miasto-notification-service.yml)

## Dlaczego?
Wszyscy jesteśmy obywatelami naszego kraju, ale w życiu codziennym bardziej odczuwamy to, że jesteśmy obywatelami naszego miasta. Dlatego nasza drużyna postanowiła wyjść na przeciw potrzebom każdego z nas i stworzyliśmy aplikację Moje Miasto. Nasza aplikacja to swego rodzaju niezbędnik 'obywatela miasta'.
## Jak działa?
W naszej aplikacji możesz sprawdzić kiedy wyrzucić śmieci, czy w twoim miejscu zamieszkania zbliża się jakieś wyłączenie mediów (np. prąd i woda), czy to już czas aby opłacić rachunki (obecnie tylko w wersji iOS) lub jaka jest dzisiaj jakość powietrza. Użytkownik podczas konfiguracji wybiera adres dla którego konfigurowane są wszystkie usługi z listy miast dla których została przygotowana implementacja. Poza możliwością sprawdzenia wszystkich usług w aplikacji, użytkownik (w wersji Android) otrzyma również powiadomienia przypominające o wywozie odpadów, czy awariach, kiedy się takowe pojawią (za pomocą naszej usługi MojeMiasto.NotificationService).
Backend (MojeMiasto.api) odpowiada za pobieranie danych z odpowiednich API lub stron internetowych (odpowiednio dla każdej implementacji) i ich przetwarzanie. Został on zaprojektowany tak aby aplikacja działała jak najszybciej. Zapisuje on w bazie dane kiedy te są pobierane po raz pierwszy co umożliwia znacznie szybsze ładowanie aplikacji. Jednocześnie dba on o aktualność danych, dlatego są one aktualizowane w sposób nie przeszkadzający użytkownikowi.
## Dlaczego akurat my?
Nasza aplikacja jest praktyczna w użyciu i wszechstronna. Na rynku nie ma obecnie innej aplikacji która łączy w sobie tyle funkcji i jest stworzona dla wielu miast. Zawiera w sobie wszystkie najpotrzebniejsze dla nowoczesnego obywatela informacje. Wykorzystaliśmy nowe technologie i rozwiązania dzięki którym nie przeciążamy zewnętrznych usług, a użytkownik ma szybki dostęp do danych. Zaprojektowaliśmy nasz cały system w taki sposób aby bezproblemowo dodawać do niej kolejne miasta.
## Jak zacząć?
Aby korzystać z aplikacji na systemie Android pobierz plik .APK

[MojeMiasto.apk](https://github.com/MojeMiasto/.github/blob/main/MojeMiasto.apk)

Aby przetestować aplikację na systemie iOS: 
1. Pobierz na komputer z zainstalowanym Node.js i npm repozytorium MojeMiasto.app 
2. Uruchom komendę `npm install`
3. Uruchom komendę `npm start`
4. W telefonie zainstaluj aplikację expo
5. Będąc połączonym do tej samej sieci co komputer zeskanuj kod QR lub przepisz w aplikacji adres widoczny po uruchomieniu programu
## Screeny
Screeny znajdują się w repozytorium [.github](https://github.com/MojeMiasto/.github/tree/main/screens)
