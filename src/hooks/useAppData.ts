import { useEffect } from 'react';
import { useAppStore } from '../store/appStore';

export const useAppData = () => {
  const { setNodes, setEdges, setLoading, setError } = useAppStore();

  useEffect(() => {
    const fetchGraphData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/graph-data');
        if (!response.ok) {
          throw new Error(`Network response error: ${response.status}`);
        }
        const data = await response.json();
        setNodes(data.nodes);
        setEdges(data.edges);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchGraphData();
  }, [setNodes, setEdges, setLoading, setError]);
};
