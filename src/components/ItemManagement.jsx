import React, { useState } from 'react';

function ItemManagement({ items, regions, onAddItem, onUpdateItem, onDeleteItem }) {
  const [selectedRegion, setSelectedRegion] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [schutzart, setSchutzart] = useState('');
  const [bws, setBws] = useState('');
  const [typ, setTyp] = useState('');
  const [art, setArt] = useState('');
  const [serie, setSerie] = useState('');
  const [material, setMaterial] = useState('');
  const [editingItemId, setEditingItemId] = useState(null);
  const [copyToRegion, setCopyToRegion] = useState('');

  const filteredItems = items.filter(item => item.regions && item.regions.includes(selectedRegion));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedRegion) {
      alert('Bitte wähle zuerst ein Gebiet aus.');
      return;
    }
    const newItem = {
      name,
      price,
      regions: [selectedRegion],
      schutzart,
      bws,
      typ,
      art,
      serie,
      material,
    };

    if (editingItemId) {
      onUpdateItem({ id: editingItemId, ...newItem });
    } else {
      onAddItem(newItem);
    }

    setName('');
    setPrice('');
    setSchutzart('');
    setBws('');
    setTyp('');
    setArt('');
    setSerie('');
    setMaterial('');
    setEditingItemId(null);
  };

  const handleEditItem = (item) => {
    setEditingItemId(item.id);
    setName(item.name);
    setPrice(item.price);
    setSchutzart(item.schutzart);
    setBws(item.bws);
    setTyp(item.typ);
    setArt(item.art);
    setSerie(item.serie);
    setMaterial(item.material);
  };

  const handleDeleteItem = (itemId) => {
    if (window.confirm('Möchten Sie diesen Artikel wirklich löschen?')) {
      onDeleteItem(itemId);
    }
  };

  const handleDeleteAllItems = () => {
    if (window.confirm(`Möchten Sie wirklich alle Artikel für das Gebiet ${regions.find(r => r.id === selectedRegion)?.name} löschen?`)) {
      const allItemsInSelectedRegion = items.filter(item => item.regions && item.regions.includes(selectedRegion));
      allItemsInSelectedRegion.forEach(item => onDeleteItem(item.id));
    }
  };

  const handleCopyToRegion = () => {
    if (!copyToRegion) {
      alert('Bitte wählen Sie ein Zielgebiet aus.');
      return;
    }

    if (window.confirm(`Möchten Sie wirklich alle Artikel von ${regions.find(r => r.id === selectedRegion)?.name} nach ${regions.find(r => r.id === copyToRegion)?.name} kopieren?`)) {
      const allItemsInSelectedRegion = items.filter(item => item.regions && item.regions.includes(selectedRegion));
      const newItems = allItemsInSelectedRegion.map(item => ({
        ...item,
        name: item.name,
        price: item.price,
        regions: [copyToRegion],
        schutzart: item.schutzart,
        bws: item.bws,
        typ: item.typ,
        art: item.art,
        serie: item.serie,
        material: item.material,
      }));
      newItems.forEach(newItem => onAddItem(newItem));
      setCopyToRegion('');
    }
  };

  return (
    <div>
      <h2>Artikel erstellen</h2>
      <select value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)}>
        <option value="">Gebiet auswählen</option>
        {regions.map(region => (
          <option key={region.id} value={region.id}>{region.name}</option>
        ))}
      </select>

      {selectedRegion && (
        <div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Artikel Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="number"
              placeholder="Preis"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <select value={schutzart} onChange={(e) => setSchutzart(e.target.value)}>
              <option value="">Schutzart</option>
              <option value="Niedrig">Niedrig</option>
              <option value="IP54">IP54</option>
              <option value="IP65+">IP65+</option>
            </select>

            <select value={bws} onChange={(e) => setBws(e.target.value)}>
              <option value="">BWS</option>
              <option value="Ja">Ja</option>
              <option value="Nein">Nein</option>
            </select>

            <select value={typ} onChange={(e) => setTyp(e.target.value)}>
              <option value="">Typ</option>
              <option value="RZ">RZ</option>
              <option value="SL">SL</option>
              <option value="Modul">Modul</option>
              <option value="Sonstiges">Sonstiges</option>
            </select>

            <select value={art} onChange={(e) => setArt(e.target.value)}>
              <option value="">Art</option>
              <option value="EZB">EZB</option>
              <option value="EVG">EVG</option>
            </select>

            <select value={serie} onChange={(e) => setSerie(e.target.value)}>
              <option value="">Serie</option>
              <option value="Display">Display</option>
              <option value="Würfel">Würfel</option>
              <option value="Kompakt">Kompakt</option>
              <option value="Kombi">Kombi</option>
              <option value="Spot">Spot</option>
              <option value="Trapez">Trapez</option>
              <option value="Fokus">Fokus</option>
              <option value="SUB">SUB</option>
              <option value="Sonder">Sonder</option>
            </select>

            <select value={material} onChange={(e) => setMaterial(e.target.value)}>
              <option value="">Material</option>
              <option value="Stahl">Stahl</option>
              <option value="Alu">Alu</option>
              <option value="PC">PC</option>
              <option value="Edelstahl">Edelstahl</option>
              <option value="Sonder">Sonder</option>
            </select>

            <button type="submit">{editingItemId ? 'Update Artikel' : 'Artikel hinzufügen'}</button>
          </form>

          <select value={copyToRegion} onChange={(e) => setCopyToRegion(e.target.value)}>
            <option value="">Zielgebiet auswählen</option>
            {regions.map(region => (
              <option key={region.id} value={region.id}>{region.name}</option>
            ))}
          </select>
          <button onClick={handleCopyToRegion}>Artikel in Gebiet kopieren</button>
          <button className="delete-button" onClick={handleDeleteAllItems}>Alle Artikel dieses Gebietes löschen</button>

          <ul>
            {filteredItems.map(item => (
              <li key={item.id}>
                {item.name} - {item.price}
                <br />
                Schutzart: {item.schutzart}, BWS: {item.bws}, Typ: {item.typ}, Art: {item.art}, Serie: {item.serie}, Material: {item.material}
                <button onClick={() => handleEditItem(item)}>Bearbeiten</button>
                <button className="delete-button" onClick={() => handleDeleteItem(item.id)}>Löschen</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ItemManagement;
