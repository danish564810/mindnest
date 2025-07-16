import React, { useEffect, useState, useRef, useCallback } from "react";
import { fetchPharmacies, submitSelectedPharmacy } from "../../../../../Api";
import useIntakeStore from "../../../../../Store/intakeStore";

const PharmacySlideBody = ({ onSelect }) => {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [pharmacies, setPharmacies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);

  const observerRef = useRef();

 const selectedPharmacy = useIntakeStore(state => state.selectedPharmacy);
const setSelectedPharmacy = useIntakeStore(state => state.setSelectedPharmacy);
const intakeTaskView = useIntakeStore(state => state.intakeTaskView);

  const loadPharmacies = async ({ reset = false } = {}) => {
    if (loading) return;
    setLoading(true);
    try {
      const currentPage = reset ? 1 : page;
      const { results, hasMore: more } = await fetchPharmacies({
        q: query,
        city,
        zipCode,
        page: currentPage,
      });

      if (reset) {
        setPharmacies(results);
      } else {
        setPharmacies((prev) => [...prev, ...results]);
      }

      setHasMore(more);
      setPage(currentPage + 1);
    } catch (err) {
      console.error("Failed to fetch pharmacies:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPage(1);
      loadPharmacies({ reset: true });
    }, 500);
    return () => clearTimeout(timeout);
  }, [query, city, zipCode]);

  const handleSelect = async (pharmacy) => {
    setSelectedPharmacy(pharmacy);
    console.log("selectedPharmacy from store:", selectedPharmacy);
    if (onSelect) onSelect(pharmacy);
    try {
      await submitSelectedPharmacy({
        taskId: 123,
        name: pharmacy.text,
        address: pharmacy.html,
      });
    } catch (err) {
      console.error("Error submitting pharmacy:", err);
    }
  };

  const getInitials = (name) => {
    if (!name) return "";
    const cleanName = name.replace(/[^a-zA-Z ]/g, "");
    const words = cleanName.trim().split(/\s+/);
    return ((words[0]?.[0] || "") + (words[1]?.[0] || "")).toUpperCase();
  };

  // IntersectionObserver for infinite scroll
  const lastItemRef = useCallback(
    (node) => {
      if (loading) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadPharmacies();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <div className="modal-body-inner intake-modal switch-modal">
      <div className="modal-title phar-intak">
        <h5>Select your local pharmacy</h5>
      </div>

      <div className="phar-main">
        <div className="search-pharmecy toggle-icons d-flex align-items-center">
          <div className="search-input">
            <input
              type="text"
              placeholder="Search by name, city or zip..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="fn-scroller-p1"
            />
          </div>
        </div>

        <div className="phar-toggle-main phar-m">
          <div className="toggle-city-zip d-flex justify-content-between mt-2">
            <div className="city-name-field">
              <label>City</label>
              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="fn-scroller-p2"
              />
            </div>
            <div className="zip-code-field">
              <label>Zip Code</label>
              <input
                type="number"
                placeholder="Zip Code"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                className="fn-scroller-p3"
              />
            </div>
          </div>
        </div>
      </div>

      <ul className="Pharmacy-name mt-3">
        {pharmacies.map((pharmacy, index) => {
          const isLast = index === pharmacies.length - 1;
          const isSelected = String(selectedPharmacy?.id) === String(pharmacy.id);

          return (
            <li
              key={`${pharmacy.id}-${index}`}
              className="pharmecy-items d-flex fn-pharmacy-item"
              onClick={() => handleSelect(pharmacy)}
              ref={isLast ? lastItemRef : null}
            >
              <div className="n-im d-flex align-items-center">
                <div className="phar-image">
                  <div className="phar-image-container">
                    <span className="defaultinitials">
                      {getInitials(pharmacy.text)}
                    </span>
                  </div>
                </div>
                <div className="phar-detail">
                  <div className="phar-name">{pharmacy.text}</div>
                  <div className="phar-address">{pharmacy.html}</div>
                </div>
              </div>
              <div className={`pharm-next ${isSelected ? "selected" : ""}`}>
                <button className="icon-cheveron-right phar-next-icon"></button>
              </div>
            </li>
          );
        })}

        {pharmacies.length === 0 && (
          <li className="text-center d-flex align-items-center justify-content-center h-100">
            No pharmacies found.
          </li>
        )}

        {loading && (
          <div className="text-center mt-2 mb-3">
            <span>Loading more...</span>
          </div>
        )}
      </ul>
    </div>
  );
};

export default PharmacySlideBody;
