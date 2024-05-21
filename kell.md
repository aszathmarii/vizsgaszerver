az ordering és a product tábla közé kell egy kapcsolótábla, amiben eltároljuk hogy melyik termékből mennyit vettünk, és ide beírjuk az ordering tábla orderingID mezőjét

1. a kosár táblába beírjuk a termékeket userID alapján
2. amikor elküldjük a vásárlás végösszegét, akkor elsőnek az ordering táblába írunk egy új rendelést, hogy ki és összesen mennyit fizetett
3. azután a kosár táblába beleírjuk minden egyes termék mellé a már létrehozott orderingID-t, így tudjuk, hogy az egyes termékek melyik rendeléshez tartoztak