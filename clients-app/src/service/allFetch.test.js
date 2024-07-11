import { getCandidates, saveCandidate, deleteCandidate } from './allFetch';
import BASE_URL from './api';

const mockFetch = (status, response) => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: status >= 200 && status < 300,
      status,
      json: () => Promise.resolve(response),
    })
  );
};

describe('allFetch service', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('getCandidates', () => {
    it('deve retornar candidatos com sucesso', async () => {
      const candidates = [{ id: 1, name: 'John Doe' }];
      mockFetch(200, candidates);

      const response = await getCandidates();
      expect(response).toEqual(candidates);
      expect(global.fetch).toHaveBeenCalledWith(`${BASE_URL}/`, expect.any(Object));
    });

    it('deve lançar um erro quando a requisição falhar', async () => {
      mockFetch(500, {});

      await expect(getCandidates()).rejects.toBeDefined();
      expect(global.fetch).toHaveBeenCalledWith(`${BASE_URL}/`, expect.any(Object));
    });
  });

  describe('saveCandidate', () => {
    it('deve salvar um candidato com sucesso', async () => {
      const candidate = { id: 1, name: 'John Doe' };
      mockFetch(201, candidate);

      const response = await saveCandidate(candidate);
      expect(response).toEqual(candidate);
      expect(global.fetch).toHaveBeenCalledWith(`${BASE_URL}/save`, expect.objectContaining({
        method: 'POST',
        body: JSON.stringify(candidate),
      }));
    });

    it('deve lançar um erro quando a requisição falhar', async () => {
      const candidate = { id: 1, name: 'John Doe' };
      mockFetch(500, {});

      await expect(saveCandidate(candidate)).rejects.toBeDefined();
      expect(global.fetch).toHaveBeenCalledWith(`${BASE_URL}/save`, expect.objectContaining({
        method: 'POST',
        body: JSON.stringify(candidate),
      }));
    });
  });

  describe('deleteCandidate', () => {
    it('deve deletar um candidato com sucesso', async () => {
      const candidate = { id: 1, name: 'John Doe' };
      mockFetch(200, {});

      const response = await deleteCandidate(candidate);
      expect(response).toEqual({});
      expect(global.fetch).toHaveBeenCalledWith(`${BASE_URL}/delete`, expect.objectContaining({
        method: 'DELETE',
        body: JSON.stringify(candidate),
      }));
    });

    it('deve lançar um erro quando a requisição falhar', async () => {
      const candidate = { id: 1, name: 'John Doe' };
      mockFetch(500, {});

      await expect(deleteCandidate(candidate)).rejects.toBeDefined();
      expect(global.fetch).toHaveBeenCalledWith(`${BASE_URL}/delete`, expect.objectContaining({
        method: 'DELETE',
        body: JSON.stringify(candidate),
      }));
    });
  });
});
